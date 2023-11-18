import {
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsPhoneNumber } from 'src/helpers';

export class AddressDTO {
  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsPositive()
  cityAreaCode: number;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @Type(() => AddressDTO)
  @ValidateNested({ each: true })
  address?: AddressDTO;
}
