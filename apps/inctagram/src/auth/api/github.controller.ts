import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Req,
  Res,
  Headers,
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
import { Request, Response } from 'express';
import { CreateRefreshTokenCommand } from '../application/use-cases/create-refresh-token.command';
import { CreateAccessTokenCommand } from '../application/use-cases/create-access-token.command';
import { CommandBus } from '@nestjs/cqrs';
import { SignInUserViaOauthProviderCommand } from '../application/use-cases/create-user-via-oauth-provider.command';
import { ProviderType } from '../domain/entities/oauth-provider.entity';
import { ConfigService } from '@nestjs/config';
import { LanguageEnums } from '../../types';
import { cookieOptions } from '../../utils/constants/cookie-options';

@Controller('auth/github')
@ApiTags('Github-OAuth2')
export class GithubController {
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
  @UseGuards(ThrottlerGuard)
  @UseGuards(AuthGuard('github'))
  @HttpCode(HttpStatus.OK)
  async register() {}

  @Get('redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('github'))
  async redirect(
    @Req() req: Request & { user: { id: string; email: string } },
    @Res({ passthrough: true }) res: Response,
    @Headers('X-Url-lang') headers: LanguageEnums,
  ) {
    const { email, id } = req.user;
    const userId = await this.commandBus.execute(
      new SignInUserViaOauthProviderCommand({
        email,
        providerId: id,
        providerType: ProviderType.GITHUB,
        language: headers,
      }),
    );
    const title = req.get('User-Agent') || 'unknown user agent';
    const ip = req.socket.remoteAddress || '';
    const refreshToken = await this.commandBus.execute(
      new CreateRefreshTokenCommand(userId, title, ip),
    );
    res.cookie(
      'refreshToken',
      refreshToken,
      cookieOptions(this.configService.get('DOMAIN')),
    );
    await this.commandBus.execute(new CreateAccessTokenCommand(userId));
    const frontLink = this.configService.get('FRONT_PROD');
    const accessToken = await this.commandBus.execute(
      new CreateAccessTokenCommand(userId),
    );
    const fullLink =
      headers === LanguageEnums.en
        ? `${frontLink}/general/redirect/auth/github?code=${accessToken}&userId=${userId}`
        : `${frontLink}/ru/general/redirect/auth/github?code=${accessToken}&userId=${userId}`;
    res
      .writeHead(301, {
        Location: fullLink,
      })

      .end();
  }
}
