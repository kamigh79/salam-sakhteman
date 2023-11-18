import { IsPhoneNumber } from 'src/helpers';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
}
