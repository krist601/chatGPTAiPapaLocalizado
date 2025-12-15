import { Controller, Get, Post, Body, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { FindPhotosUseCase } from '../../../application/use-cases/find-photos.use-case';
import { SavePhotoUseCase } from '../../../application/use-cases/save-photo.use-case';
import { FindPhotosDto } from './find-photos.dto';
import { SavePhotoDto } from './save-photo.dto';
import { Photo } from '../../../domain/photo.entity';

@Controller('photos')
export class PhotoController {
    constructor(
        private readonly findPhotosUseCase: FindPhotosUseCase,
        private readonly savePhotoUseCase: SavePhotoUseCase,
    ) { }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async findPhotos(@Query() query: FindPhotosDto): Promise<Photo[]> {
        return this.findPhotosUseCase.execute(query.latitude, query.longitude, query.radius);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async savePhoto(@Body() body: SavePhotoDto): Promise<void> {
        return this.savePhotoUseCase.execute(body.latitude, body.longitude, body.url);
    }
}
