import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeletePostImageUriDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
