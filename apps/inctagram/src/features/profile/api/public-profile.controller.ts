import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileQueryRepository } from '../db/profile.query-repository';
import {
  ProfileViewExample,
  PublicProfilesTotalCountViewExample,
} from './swagger-examples/response-examples';

@Controller('public-profile')
@ApiTags('Public-profile')
export class PublicProfileController {
  constructor(private profileQueryRepo: ProfileQueryRepository) {}
  @Get('/total')
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: PublicProfilesTotalCountViewExample },
    },
  })
  getRegisteredUsers() {
    return this.profileQueryRepo.getAllUsersCount();
  }
  @Get('/:userId')
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: ProfileViewExample },
    },
  })
  findProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.profileQueryRepo.getUserPublicProfile(userId);
  }
}
