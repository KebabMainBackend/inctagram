import { PartialType } from '@nestjs/swagger';
import { AuthRegisterDto } from './auth-register.dto';

export class UpdateAuthDto extends PartialType(AuthRegisterDto) {}
