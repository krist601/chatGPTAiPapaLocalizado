import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';

export type PhotoDocument = PhotoModel & Document;

@Schema({ collection: 'photos' })
export class PhotoModel {
    @Prop({ required: true })
    url: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    })
    location: {
        type: string;
        coordinates: [number, number]; // [longitude, latitude]
    }
    @Prop({ type: Date, required: false, default: null })
    timestamp: Date;
}

export const PhotoSchema = SchemaFactory.createForClass(PhotoModel);

// Create 2dsphere index for geospatial queries
PhotoSchema.index({ location: '2dsphere' });
