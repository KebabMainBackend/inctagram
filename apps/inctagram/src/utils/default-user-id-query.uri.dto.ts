import { IsOptional, IsString } from 'class-validator';

export class DefaultUserIdQueryUriDto {
  @IsOptional()
  @IsString()
  userId: string;
}
