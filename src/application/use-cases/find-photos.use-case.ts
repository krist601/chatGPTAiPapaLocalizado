import { Inject, Injectable } from '@nestjs/common';
import { Photo } from '../../domain/photo.entity';
import { PHOTO_REPOSITORY } from '../ports/photo.repository';
import type { PhotoRepository } from '../ports/photo.repository';

@Injectable()
export class FindPhotosUseCase {
    constructor(
        @Inject(PHOTO_REPOSITORY)
        private readonly photoRepository: PhotoRepository,
    ) { }

    async execute(latitude: number, longitude: number, radius: number): Promise<Photo[]> {
        return this.photoRepository.findInRadius(latitude, longitude, radius);
    }
}
