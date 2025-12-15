import { Test, TestingModule } from '@nestjs/testing';
import { FindPhotosUseCase } from './find-photos.use-case';
import { PHOTO_REPOSITORY } from '../ports/photo.repository';
import { Photo } from '../../domain/photo.entity';

describe('FindPhotosUseCase', () => {
    let useCase: FindPhotosUseCase;
    let repositoryMock: any;

    beforeEach(async () => {
        repositoryMock = {
            findInRadius: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPhotosUseCase,
                {
                    provide: PHOTO_REPOSITORY,
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        useCase = module.get<FindPhotosUseCase>(FindPhotosUseCase);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should call repository.findInRadius with correct parameters', async () => {
        const lat = 10;
        const long = 20;
        const radius = 100;
        const expectedPhotos = [new Photo('1', lat, long, 'http://url')];

        repositoryMock.findInRadius.mockResolvedValue(expectedPhotos);

        const result = await useCase.execute(lat, long, radius);

        expect(repositoryMock.findInRadius).toHaveBeenCalledWith(lat, long, radius);
        expect(result).toEqual(expectedPhotos);
    });
});
