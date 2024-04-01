import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TooManyRequestsResponseOptions } from '../../utils/constants/swagger-constants';
import { AuthGuard } from '@nestjs/passport';
import { CreateRefreshTokenCommand } from '../application/use-cases/create-refresh-token.command';
import { Request, Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { SignInUserViaOauthProviderCommand } from '../application/use-cases/create-user-via-oauth-provider.command';
import { ProviderType } from '../domain/entities/oauth-provider.entity';
import { CreateAccessTokenCommand } from '../application/use-cases/create-access-token.command';
import { ConfigService } from '@nestjs/config';

@Controller('auth/google')
@ApiTags('Google-OAuth2')
export class GoogleController {
  constructor(
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  @ApiOkResponse({
    description:
      'An email with a verification code has been sent to the specified email address',
    content: {
      'application/json': { example: { accessToken: 'string' } },
    },
  })
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Get('login')
  // en + ru lang
  @UseGuards(ThrottlerGuard)
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  async register() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  async redirect(
    @Req() req: Request & { user: { id: string; email: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, id } = req.user;
    const userId = await this.commandBus.execute(
      new SignInUserViaOauthProviderCommand(email, id, ProviderType.GOOGLE),
    );
    const title = req.get('User-Agent') || 'unknown user agent';
    const ip = req.socket.remoteAddress || '';
    const refreshToken = await this.commandBus.execute(
      new CreateRefreshTokenCommand(userId, title, ip),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    const frontLink = this.configService.get('FRONT_PROD');
    const accessToken = await this.commandBus.execute(
      new CreateAccessTokenCommand(userId),
    );
    res
      .writeHead(301, {
        Location: `${frontLink}/general/redirect/google?code=${accessToken}`,
      })

      .end();
  }
}
