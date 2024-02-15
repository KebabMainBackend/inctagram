import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/swagger-constants';
import { CommandBus } from '@nestjs/cqrs';

@Controller('profile')
export class ProfileController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
  @UseGuards(BearerAuthGuard)
  create(@Body() createProfileDto: CreateProfileDto) {
    return 'this.profileService.create(createProfileDto);';
  }

  @Get()
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: { accessToken: 'string' } },
    },
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @UseGuards(BearerAuthGuard)
  findAll() {
    return 'this.profileService.findAll()';
  }

  @Put()
  @UseGuards(BearerAuthGuard)
  update(@Body() updateProfileDto: UpdateProfileDto) {
    return 'this.profileService.update(+id, updateProfileDto)';
  }

  @Delete()
  @UseGuards(BearerAuthGuard)
  remove() {
    return 'this.profileService.remove(+id)';
  }
}
