import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL:
        configService.get('PROD_URL') + '/api/v1/auth/github/redirect',
      scope: ['user'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    let email: string;
    if (!profile.emails) {
      const req = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: 'token ' + accessToken,
        },
      });
      const emails = await req.json();
      if (req.status !== 404) {
        email = (emails.find((e) => e.primary) ?? emails[0]).email;
        return {
          email: email || null,
          id: profile.id,
        };
      }
    }
    throw new HttpException('email is hidden', HttpStatus.CONFLICT);
  }
}
