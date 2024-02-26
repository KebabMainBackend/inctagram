import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
      callbackURL: process.env['PROD_URL'] + '/api/v1/auth/github/redirect',
      scope: ['user'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (profile.emails) {
      return {
        email: profile.emails[0].value || null,
        id: profile.id,
      };
    }
    throw new HttpException('email is hidden', HttpStatus.CONFLICT);
  }
}
