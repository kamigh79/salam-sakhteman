import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema({
  timestamps: true,
  collection: 'user_profiles',
})
export class UserProfile {
  @Prop({ required: true })
  userId: string;

  address?: {
    province?: string;
    city?: string;
    postalCode?: string;
  };

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
