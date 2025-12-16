import { Photo } from '../../domain/photo.entity';

export interface PhotoRepository {
    findInRadius(latitude: number, longitude: number, radius: number): Promise<Photo[]>;
    save(photo: Photo): Promise<void>;
}

export const PHOTO_REPOSITORY = 'PHOTO_REPOSITORY';
