import { User, UserDocument } from '../models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User) {
    const newUser = new this.userModel(user);

    await newUser.save();

    return newUser;
  }

  async findByPhoneNumber(input: string) {
    return this.userModel.findOne({
      phoneNumber: input,
    });
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
