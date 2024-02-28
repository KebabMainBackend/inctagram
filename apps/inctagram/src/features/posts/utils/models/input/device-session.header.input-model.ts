import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class DeviceSessionHeaderInputModel {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  lastActiveDate: Date;

  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  expireAt: Date;
}
