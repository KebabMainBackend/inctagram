import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
  ParseFilePipeBuilder,
  Delete,
  Inject,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { UploadAvatarCommand } from '../application/use-cases/upload-avatar.command';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { DeleteAvatarCommand } from '../application/use-cases/delete-avatar.command';
import { ClientProxy } from '@nestjs/microservices';

@Controller('profile')
@ApiTags('Profile')
@UseGuards(BearerAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class ProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private profileQueryRepo: ProfileQueryRepository,
  ) {}
  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }
  @Get()
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: ProfileViewExample },
    },
  })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile avatar',
    type: UploadAvatarDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^.+(jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const user = req.owner;
    const extension = file.originalname.split('.');
    if (user) {
      // const pattern = { cmd: 'upload-avatar' };
      // const payload = {
      //   userId: user.id,
      // };
      // this.client.send(pattern, payload);
      await this.commandBus.execute(
        new UploadAvatarCommand(
          file.buffer,
          file.mimetype,
          extension.at(-1),
          user.id,
          file.size,
        ),
      );
      return;
    }
    throw new UnauthorizedException();
  }

  @Delete('avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse(NoContentResponseOptions)
  async delete(@Req() req: Request) {
    const user = req.owner;
    if (user) {
      await this.commandBus.execute(new DeleteAvatarCommand(user.id));
      return;
    }
    throw new UnauthorizedException();
  }
}
