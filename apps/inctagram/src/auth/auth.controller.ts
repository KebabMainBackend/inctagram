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
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
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
import { CreateRefreshTokenCommand } from './commands/create-refresh-token.command';
import { CreateAccessTokenCommand } from './commands/create-access-token.command';
import { CommandBus } from '@nestjs/cqrs';
import { AuthVerifyEmailDto } from './dto/auth-verify-email.dto';
import { DecodeRefreshTokenCommand } from './commands/decode-refresh-token.command';
import { DeleteDeviceCommand } from '../features/security-devices/commands/delete-device.command';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private commandBus: CommandBus,
  ) {}

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
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: AuthLoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const email = loginDto.email;
    const password = loginDto.password;
    const userId = await this.authService.checkCredentials(email, password);
    const title = req.get('User-Agent') || 'unknown user agent';
    const ip = req.socket.remoteAddress || '';
    const refreshToken = await this.commandBus.execute(
      new CreateRefreshTokenCommand(userId, title, ip),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    const accessToken = await this.commandBus.execute(
      new CreateAccessTokenCommand(userId),
    );
    return { accessToken };
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
    if (refreshToken) {
      const result = await this.commandBus.execute(
        new DecodeRefreshTokenCommand(refreshToken),
      );
      if (result) {
        await this.commandBus.execute(new DeleteDeviceCommand(result.deviceId));
        return;
      }
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Post('registration-confirmation')
  @ApiNoContentResponse(NoContentResponseOptions)
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationConfirmation(@Body() body: AuthVerifyEmailDto) {
    const code = body.confirmationCode;
    await this.authService.verifyConfirmationCode(code);
  }

  @ApiExcludeEndpoint()
  @Delete('delete-me')
  async deleteMe() {
    this.authService.deleteMe();
  }
}
