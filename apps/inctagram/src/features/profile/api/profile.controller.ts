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
  ParseFilePipeBuilder,
  Delete,
  Inject,
  HttpException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponseOptions,
  NoContentResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/constants/swagger-constants';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileQueryRepository } from '../db/profile.query-repository';
import {
  ProfileImagesViewExample,
  ProfileViewExample,
} from '../db/view/profile.view';
import { UpdateProfileCommand } from '../application/use-cases/update-profile.command';
import { UploadAvatarCommand } from '../application/use-cases/upload-avatar.command';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { DeleteAvatarCommand } from '../application/use-cases/delete-avatar.command';
import { User } from '../../../utils/decorators/user.decorator';
import { UserTypes } from '../../../types';
import { ClientProxy } from '@nestjs/microservices';
import { CheckMimetype } from '../../../utils/custom-validators/file.validator';

@Controller('profile')
@ApiTags('Profile')
@UseGuards(BearerAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class ProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private profileQueryRepo: ProfileQueryRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}
  @Get('hello-world')
  @ApiExcludeEndpoint()
  async sendHello() {
    try {
      return this.client.send(
        {
          cmd: 'hello-world',
        },
        {
          l: '',
        },
      );
    } catch (e) {
      console.log(e, 'error');
      throw new HttpException(e, HttpStatus.CONFLICT);
    }
  }
  @Get()
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': { example: ProfileViewExample },
    },
  })
  findProfile(@User() user: UserTypes) {
    return this.profileQueryRepo.getUserProfile(user.id);
  }

  @Put()
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @User() user: UserTypes,
  ) {
    await this.commandBus.execute<UpdateProfileCommand, void>(
      new UpdateProfileCommand(updateProfileDto, user.id),
    );
    return;
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile avatar',
    type: UploadAvatarDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiUnprocessableEntityResponse({
    description: 'invalid file, wrong fileType or maxSize',
  })
  @ApiCreatedResponse({
    description: 'Uploaded image information object.',
    content: {
      'application/json': { example: ProfileImagesViewExample },
    },
  })
  async uploadFile(
    @User() user: UserTypes,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^.+(jpeg|png)$/,
        })
        .addValidator(new CheckMimetype({ mimetype: 'jpeg' }))
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.commandBus.execute(
      new UploadAvatarCommand(file.buffer, user.id),
    );
  }

  @Delete('avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse(NoContentResponseOptions)
  async delete(@User() user: UserTypes) {
    await this.commandBus.execute(new DeleteAvatarCommand(user.id));
    return;
  }
}
