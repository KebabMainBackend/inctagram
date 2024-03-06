import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeletePostImageUriInputModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
