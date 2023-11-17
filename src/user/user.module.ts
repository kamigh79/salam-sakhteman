import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { UserProfileService } from './services/user-profile.service';
import { UserProfile, UserProfileSchema } from './models/user-profile.schema';
import { UserController } from './controllers/user.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
      },
    ]),
  ],
  providers: [UserService, UserProfileService],
  controllers: [UserController],
  exports: [UserService, UserProfileService],
})
export class UserModule {}
