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
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
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
} from '../../../utils/swagger-constants';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileQueryRepository } from '../db/profile.query-repository';
import { ProfileViewExample } from '../db/view/profile.view';
import { UpdateProfileCommand } from '../application/use-cases/update-profile.command';
import { UploadAvatarCommand } from '../application/use-cases/upload-avatar.command';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { DeleteAvatarCommand } from '../application/use-cases/delete-avatar.command';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../../utils/decorators/user.decorator';
import { UserTypes } from '../../../types';

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
  @ApiCreatedResponse(NoContentResponseOptions)
  async uploadFile(
    @User() user: UserTypes,
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
    const extension = file.originalname.split('.');
    // const pattern = { cmd: 'upload-avatar' };
    // const payload = {
    //   userId: user.id,
    // };
    // return this.client.send(pattern, payload);
    return await this.commandBus.execute(
      new UploadAvatarCommand(
        file.buffer,
        extension.at(-1),
        user.id,
        file.size,
      ),
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
