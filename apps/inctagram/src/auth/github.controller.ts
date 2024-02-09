import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  BadRequestResponseOptions,
  TooManyRequestsResponseOptions,
} from '../utils/swagger-constants';
import * as querystring from 'querystring';

@Controller('auth/github')
@ApiTags('Github-OAuth2')
export class GithubController {
  constructor(private readonly authService: AuthService) {}

  @ApiNoContentResponse({
    description:
      'An email with a verification code has been sent to the specified email address',
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Get('login')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Res() res) {
    const clientId = process.env['GITHUB_CLIENT_ID'];
    const redirectUri = process.env.PROD_URL + '/api/v1/auth/github/redirect';
    const scope = 'user'; // Здесь можете указать необходимые права
    const queryParams = querystring.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
    });

    const githubAuthUrl = `https://github.com/login/oauth/authorize?${queryParams}`;
    res.redirect(githubAuthUrl);
  }
  @ApiCreatedResponse({
    description: 'success',
    content: {
      'application/json': {
        example: { accessToken: 'string', email: 'string' },
      },
    },
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @ApiTooManyRequestsResponse(TooManyRequestsResponseOptions)
  @Get('redirect')
  @UseGuards(ThrottlerGuard)
  async redirect(@Req() req, @Res() res) {
    const { code } = req.query;
    const clientSecret = process.env['GITHUB_CLIENT_SECRET'];
    const clientId = process.env['GITHUB_CLIENT_ID'];
    const redirectUri = process.env.PROD_URL + '/api/v1/auth/github/redirect';
    console.log(code);
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    };
    console.log(params);
    try {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(params),
        },
      );
      const data = await response.json();
      const accessToken = data.access_token;
      console.log(accessToken, data);

      // Используйте accessToken для запросов к API GitHub или сохраните его в базе данных

      res.send('Аутентификация успешна');
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      res.send('Ошибка аутентификации');
    }
  }
}
