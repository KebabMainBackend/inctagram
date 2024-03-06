import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePostUriInputModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
