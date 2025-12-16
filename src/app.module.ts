import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PhotoController } from './infrastructure/adapters/controller/photo.controller';
import { FindPhotosUseCase } from './application/use-cases/find-photos.use-case';
import { SavePhotoUseCase } from './application/use-cases/save-photo.use-case';
import { MongoPhotoRepository } from './infrastructure/adapters/repository/mongo-photo.repository';
import { PHOTO_REPOSITORY } from './application/ports/photo.repository';
import { PhotoModel, PhotoSchema } from './infrastructure/adapters/repository/photo.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: configService.get<string>('MONGO_DB') || 'StreetView',

      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: PhotoModel.name, schema: PhotoSchema }]),
  ],
  controllers: [PhotoController],
  providers: [
    FindPhotosUseCase,
    SavePhotoUseCase,
    {
      provide: PHOTO_REPOSITORY,
      useClass: MongoPhotoRepository,
    },
  ],
})
export class AppModule { }
