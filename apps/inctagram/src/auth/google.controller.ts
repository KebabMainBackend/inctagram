import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  BadRequestResponseOptions,
  TooManyRequestsResponseOptions,
} from '../utils/swagger-constants';

@Controller('auth/google')
@ApiTags('Google-OAuth2')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @ApiNoContentResponse({
    description:
      'An email with a verification code has been sent to the specified email address',
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Post('/login')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() registerDTO: AuthRegisterDto) {
    return await this.authService.register(registerDTO);
  }
}
