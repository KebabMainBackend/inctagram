import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostUriDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
