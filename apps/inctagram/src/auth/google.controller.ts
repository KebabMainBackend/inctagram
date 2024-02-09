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
  ApiExcludeEndpoint,
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
import { AuthGuard } from '@nestjs/passport';

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
  @Get('login')
  @UseGuards(ThrottlerGuard)
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Res() res) {
    // const clientId = process.env['GOOGLE_CLIENT_ID'];
    // const redirectUri = process.env.PROD_URL + '/api/v1/auth/google/redirect';
    // const scope = 'profile';
    // const queryParams = querystring.stringify({
    //   client_id: clientId,
    //   redirect_uri: redirectUri,
    //   scope: scope,
    //   response_type: 'code',
    // });
    //
    // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;
    // res.redirect(googleAuthUrl);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  async redirect(@Req() req) {
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  //   const { code } = req.query;
  //   const clientSecret = process.env['GOOGLE_CLIENT_ID'];
  //   const clientId = process.env['GOOGLE_CLIENT_ID'];
  //   const redirectUri = process.env.PROD_URL + '/api/v1/auth/google/redirect';
  //   const params = {
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     code: code,
  //     redirect_uri: redirectUri,
  //     grant_type: 'authorization_code',
  //   };
  //   try {
  //     const response = await fetch('https://oauth2.googleapis.com/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: querystring.stringify(params),
  //     });
  //     const data = await response.json();
  //     // const accessToken = querystring.parse(data.data).access_token;
  //     console.log(data);
  //
  //     // Используйте accessToken для запросов к API GitHub или сохраните его в базе данных
  //
  //     res.send('Аутентификация успешна');
  //   } catch (error) {
  //     console.error('Ошибка аутентификации:', error);
  //     res.send('Ошибка аутентификации');
  //   }
  // }
}

// https://authorization-server.com/authorize?
//   response_type=code
//   &client_id=6cVccEi0lWiVYrro_dbEA8_k
// &redirect_uri=https://www.oauth.com/playground/authorization-code.html
// &scope=photo+offline_access
// &state=JXGc13ZYrwBXCybZ
