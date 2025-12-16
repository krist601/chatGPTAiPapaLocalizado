import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPhotosDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    radius: number;
}
