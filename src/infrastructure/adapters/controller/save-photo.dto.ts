import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class SavePhotoDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    longitude: number;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;
}
