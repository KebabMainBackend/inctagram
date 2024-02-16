import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  ParseFilePipe,
  MaxFileSizeValidator,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponseOptions,
  NoContentResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/swagger-constants';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ProfileQueryRepository } from '../db/profile.query-repository';
import { ProfileViewExample } from '../db/view/profile.view';
import { UpdateProfileCommand } from '../application/use-cases/update-profile.command';

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class ProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private profileQueryRepo: ProfileQueryRepository,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: ProfileViewExample },
    },
  })
  @UseGuards(BearerAuthGuard)
  findProfile(@Req() req: Request) {
    const user = req.owner;
    if (user) {
      return this.profileQueryRepo.getUserProfile(user.id);
    }
    throw new UnauthorizedException();
  }

  @Put()
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BearerAuthGuard)
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request,
  ) {
    const user = req.owner;
    if (user) {
      await this.commandBus.execute(
        new UpdateProfileCommand(updateProfileDto, user.id),
      );
      return;
    }
    throw new UnauthorizedException();
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return;
  }
}
