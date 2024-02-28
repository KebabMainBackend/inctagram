import { IsDate, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class DeviceSessionOptionalHeaderInputModel {
  @Optional()
  @IsString()
  ip: string;

  @Optional()
  @IsString()
  title: string;

  @Optional()
  @IsString()
  lastActiveDate: string;

  @Optional()
  @IsString()
  deviceId: string;

  @Optional()
  @IsString()
  userId: string;

  @Optional()
  @IsDate()
  expireAt: Date;
}
