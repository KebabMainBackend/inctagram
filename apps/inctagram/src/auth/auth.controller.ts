import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  HttpException,
  Req,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  BadRequestResponseOptions,
  NoContentResponseOptions,
  TooManyRequestsResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../utils/swagger-constants';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNoContentResponse({
    description:
      'An email with a verification code has been sent to the specified email address',
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Post('/registration')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() registerDTO: AuthRegisterDto) {
    return await this.authService.register(registerDTO);
  }

  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: { accessToken: 'string' } },
    },
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
  @Post('/login')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Body() loginDto: AuthLoginDto) {
    console.log(loginDto);
    // return await this.authService.register(loginDto);
  }

  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: { accessToken: 'string' } },
    },
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
  @Post('/password-recovery')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async passwordRecovery(@Body() loginDto: AuthLoginDto) {
    console.log(loginDto);
    // return await this.authService.register(loginDto);
  }

  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    // return await this.authService.register(loginDto);
  }

  @Delete('delete-me')
  async deleteMe() {
    this.authService.deleteMe();
  }
}
