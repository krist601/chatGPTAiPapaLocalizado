import { Inject, Injectable } from '@nestjs/common';
import { Photo } from '../../domain/photo.entity';
import { PHOTO_REPOSITORY, type PhotoRepository } from '../ports/photo.repository';

@Injectable()
export class SavePhotoUseCase {
    constructor(
        @Inject(PHOTO_REPOSITORY) private readonly photoRepository: PhotoRepository,
    ) { }

    async execute(latitude: number, longitude: number, url: string): Promise<void> {
        const photo = new Photo('', latitude, longitude, url, new Date());
        await this.photoRepository.save(photo);
    }
}
