import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePostUriDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
