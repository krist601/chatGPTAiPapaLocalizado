import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from '../../../domain/photo.entity';
import { PhotoRepository } from '../../../application/ports/photo.repository';
import { PhotoDocument, PhotoModel } from './photo.schema';

@Injectable()
export class MongoPhotoRepository implements PhotoRepository {
    constructor(
        @InjectModel(PhotoModel.name) private photoModel: Model<PhotoDocument>,
    ) { }

    async findInRadius(latitude: number, longitude: number, radius: number): Promise<Photo[]> {
        // MongoDB expects coordinates in [longitude, latitude] order
        // radius is in meters
        const photos = await this.photoModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            },
        });

        return photos.map((photo) => new Photo(
            photo._id.toString(),
            photo.location.coordinates[1], // latitude
            photo.location.coordinates[0], // longitude
            photo.url,
            photo.timestamp
        ));
    }

    async save(photo: Photo): Promise<void> {
        const newPhoto = new this.photoModel({
            url: photo.url,
            location: {
                type: 'Point',
                coordinates: [photo.longitude, photo.latitude],
            },
        });
        await newPhoto.save();
    }
}
