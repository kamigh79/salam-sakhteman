import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { UserProfileService } from '../../user/services/user-profile.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { RedisService } from 'src/redis/redis.service';
import redisConfig from 'src/config/redis.config';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly profileService: UserProfileService,
  ) {}

  @Post('signup')
  async signUp(@Body() inputs: CreateUserDto): Promise<object> {
    const user = await this.userService.findByPhoneNumber(inputs.phoneNumber);
    if (user) {
      throw new Error('User Already Exists');
    }
    const { address, ...rest } = inputs;
    const createdUser = await this.userService.create(rest);

    if (address) {
      const profile = {
        userId: createdUser.id,
        address,
      };

      await this.profileService.create(profile);
    }

    await this.redisService.set(
      inputs.phoneNumber,
      inputs.name,
      redisConfig.user.ttl,
    );

    return {
      message: 'User Created Successfully',
    };
  }

  @Get('find')
  async findUser(@Body() inputs: FindUserDto): Promise<object> {
    const redisUser = await this.redisService.get(inputs.phoneNumber);

    if (redisUser) {
      return {
        message: 'User Showed Successfully (from redis)',
        name: redisUser,
      };
    }

    const user = await this.userService.findByPhoneNumber(inputs.phoneNumber);

    if (!user) {
      throw new Error('User Not Found');
    }

    const { name } = user.toObject();

    await this.redisService.set(inputs.phoneNumber, name, redisConfig.user.ttl);

    return {
      message: 'User Showed Successfully (from DB)',
      data: name,
    };
  }
}
