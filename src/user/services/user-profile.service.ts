import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserProfile,
  UserProfileDocument,
} from '../models/user-profile.schema';

export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private readonly profileModel: Model<UserProfileDocument>,
  ) {}

  async create(inputs: UserProfile) {
    const result = new this.profileModel(inputs);

    await result.save();

    return result;
  }

  async findByUserId(userId: string) {
    return await this.profileModel
      .findOne({
        userId: userId,
      })
      .exec();
  }
}
