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
  Get,
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
import { AuthPasswordRecoveryDto } from './dto/auth-password-recovery.dto';
import { AuthResendCodeDto } from './dto/auth-resend-code.dto';
import { AuthNewPasswordDto } from './dto/auth-new-password.dto';
import { ChangeUserPasswordCommand } from './commands/change-user-password';
import { BearerAuthGuard } from './guards/bearer-auth.guard';

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
  @Post('registration')
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
  @Post('login')
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

  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @Post('password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async passwordRecovery(@Body() passwordRecoveryDto: AuthPasswordRecoveryDto) {
    return await this.authService.sendCodeToRecoverPassword(
      passwordRecoveryDto.email,
      passwordRecoveryDto.recaptcha,
    );
  }

  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const result = await this.commandBus.execute(
        new DecodeRefreshTokenCommand(refreshToken),
      );
      if (result) {
        await this.commandBus.execute(
          new DeleteDeviceCommand(result.sessionId),
        );
        return;
      }
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Post('registration-confirmation')
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationConfirmation(@Body() body: AuthVerifyEmailDto) {
    const code = body.confirmationCode;
    await this.authService.verifyConfirmationCode(code);
  }

  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Post('registration-email-resending')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationEmailResend(@Body() body: AuthResendCodeDto) {
    const email = body.email;
    await this.authService.resendConfirmationCode(email);
    return;
  }

  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Post('new-password')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async newPassword(@Body() body: AuthNewPasswordDto) {
    const code = body.recoveryCode;
    const newPassword = body.newPassword;
    await this.commandBus.execute(
      new ChangeUserPasswordCommand(code, newPassword),
    );
  }
  @Get('me')
  @UseGuards(BearerAuthGuard)
  async getMe(@Req() req: Request) {
    const user = req.user;
    if (user) {
      return user;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @ApiExcludeEndpoint()
  @Delete('delete-me')
  async deleteMe() {
    await this.authService.deleteMe();
  }
}
