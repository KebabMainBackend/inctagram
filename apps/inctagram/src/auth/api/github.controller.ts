import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiNoContentResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  BadRequestResponseOptions,
  TooManyRequestsResponseOptions,
} from '../../utils/swagger-constants';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateRefreshTokenCommand } from '../application/use-cases/create-refresh-token.command';
import { CreateAccessTokenCommand } from '../application/use-cases/create-access-token.command';
import { CommandBus } from '@nestjs/cqrs';
import { SignInUserViaOauthProviderCommand } from '../application/use-cases/create-user-via-oauth-provider.command';
import { ProviderType } from '../domain/entities/oauth-provider.entity';

@Controller('auth/github')
@ApiTags('Github-OAuth2')
export class GithubController {
  constructor(private commandBus: CommandBus) {}

  @ApiNoContentResponse({
    description:
      'An email with a verification code has been sent to the specified email address',
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Get('login')
  @UseGuards(ThrottlerGuard)
  @UseGuards(AuthGuard('github'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async register() {}

  @Get('redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('github'))
  async redirect(
    @Req() req: Request & { user: { id: string; email: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, id } = req.user;
    const userId = await this.commandBus.execute(
      new SignInUserViaOauthProviderCommand(email, id, ProviderType.GITHUB),
    );
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
    return { accessToken, email };
  }
}
