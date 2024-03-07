import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CommandBus } from '@nestjs/cqrs';
import { DeletePostImageUriDto } from './dto/delete-post-image.uri.dto';
import { CreatePostBodyDto } from './dto/create-post.body.dto';
import { UpdatePostUriDto } from './dto/update-post.uri.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PostsQueryRepository } from '../db/posts.query-repository';
import { GetPostsUriDto } from './dto/get-posts.uri.dto';
import { Response } from 'express';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { ErrorEnum } from '../../../utils/error-enum';
import { outputMessageException } from '../../../utils/output-message-exception';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../../utils/decorators/user.decorator';
import { UserTypes } from '../../../types';
import { CreatePostCommand } from '../application/use-cases/create-post.command';
import { UpdatePostCommand } from '../application/use-cases/update-post.command';
import { UnauthorizedRequestResponseOptions } from '../../../utils/swagger-constants';
import { CheckMimetype } from '../../../utils/custom-validators/file.validator';
import { POST_IMAGE_NORMAL_SIZE } from '../../../utils/constants/default-query-params';
import { UploadPostImagesCommand } from '../application/use-cases/upload-post-images.command';

@ApiTags('Posts')
@Controller('posts')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class PostsController {
  constructor(
    protected commandBus: CommandBus,
    protected postsQueryRepository: PostsQueryRepository,
    @Inject('FILES_SERVICE') private clientProxy: ClientProxy,
  ) {}
  @ApiOperation({ summary: 'Get posts' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async getPosts(
    @Res() res: Response,
    @User() user: UserTypes,
    @Query() queryPost: GetPostsUriDto,
  ) {
    const result = await this.postsQueryRepository.findPosts(
      queryPost,
      user.id,
    );
    res.header('X-Cursor', result.cursor);
    return {
      pageSize: result.pageSize,
      totalCount: result.totalCount,
      items: result.items,
    };
  }
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async createPost(@User() user: UserTypes, @Body() body: CreatePostBodyDto) {
    const createResult = await this.commandBus.execute(
      new CreatePostCommand(user.id, body.description),
    );

    if (createResult === ErrorEnum.NOT_FOUND) throw new UnauthorizedException();
    return createResult;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing post' })
  async updatePost(
    @User() user: UserTypes,
    @Body() body: CreatePostBodyDto,
    @Param() param: UpdatePostUriDto,
  ) {
    const updateResult = await this.commandBus.execute(
      new UpdatePostCommand(user.id, param.id, body.description),
    );

    if (updateResult === ErrorEnum.USER_NOT_FOUND)
      throw new UnauthorizedException();
    if (updateResult === ErrorEnum.NOT_FOUND)
      throw new BadRequestException(
        outputMessageException(ErrorEnum.NOT_FOUND, 'id'),
      );
    if (updateResult === ErrorEnum.FORBIDDEN) throw new ForbiddenException();
    return updateResult;
  }

  @Post('images')
  @ApiOperation({ summary: 'Upload image to new post' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadPostImage(
    @User() user: UserTypes,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^.+(jpeg|png)$/,
        })
        .addValidator(new CheckMimetype({ mimetype: 'jpeg' }))
        .addMaxSizeValidator({
          maxSize: POST_IMAGE_NORMAL_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    const buffers = files.map((file) => file.buffer);
    return this.commandBus.execute(
      new UploadPostImagesCommand(buffers, user.id),
    );
  }

  @Delete('image/:id')
  @ApiOperation({ summary: 'Delete post`s image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostImage(
    @User() user: UserTypes,
    @Param() param: DeletePostImageUriDto,
  ) {
    try {
      return this.clientProxy.send<any>(
        { cmd: 'deletePostImage' },
        { userId: user.id, imageId: param.id },
      );
    } catch (err) {
      if (err.message === ErrorEnum.USER_NOT_FOUND)
        throw new HttpException(ErrorEnum.UNAUTHORIZED, 411);
      if (err.message === ErrorEnum.POST_NOT_FOUND)
        throw new HttpException(ErrorEnum.UNAUTHORIZED, 411);
      if (err.message === ErrorEnum.FORBIDDEN)
        throw new HttpException(ErrorEnum.UNAUTHORIZED, 411);
    }
  }
}
