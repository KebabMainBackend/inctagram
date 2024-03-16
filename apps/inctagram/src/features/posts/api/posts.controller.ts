import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostBodyDto } from './dto/create-post.body.dto';
import { UpdatePostUriDto } from './dto/update-post.uri.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PostsQueryRepository } from '../db/posts.query-repository';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '../../../utils/decorators/user.decorator';
import { UserTypes } from '../../../types';
import { CreatePostCommand } from '../application/use-cases/create-post.command';
import { UpdatePostCommand } from '../application/use-cases/update-post.command';
import {
  BadRequestResponseOptions,
  CursorQueryOptions,
  ForbiddenRequestResponseOptions,
  NoContentResponseOptions,
  NotFoundResponseOptions,
  PageSizeQueryOptions,
  SortByQueryOptions,
  SortDirectionQueryOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/constants/swagger-constants';
import { CheckMimetype } from '../../../utils/custom-validators/file.validator';
import { POST_IMAGE_NORMAL_SIZE } from '../../../utils/constants/default-query-params';
import { UploadPostImagesCommand } from '../application/use-cases/upload-post-images.command';
import { MicroserviceMessagesEnum } from '../../../../../../types/messages';
import { GetDefaultUriDto } from '../../../utils/default-get-query.uri.dto';
import { createErrorMessage } from '../../../utils/create-error-object';
import { DeletePostCommand } from '../application/use-cases/delete-post.command';
import {
  PostImagesViewExample,
  GetRequestPostsViewExample,
  PostViewExample,
} from './swagger-constants/response-examples';
import { UpdatePostBodyDto } from './dto/update-post.body.dto';
import { UploadPostImageDto } from './dto/upload-image.dto';

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
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': { example: GetRequestPostsViewExample },
    },
  })
  @Get()
  @ApiQuery(
    CursorQueryOptions(
      'ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.',
    ),
  )
  @ApiQuery(SortDirectionQueryOptions)
  @ApiQuery(SortByQueryOptions)
  @ApiQuery(PageSizeQueryOptions)
  async getPosts(
    @User() user: UserTypes,
    @Query() queryPost: GetDefaultUriDto,
  ) {
    return await this.postsQueryRepository.findPosts(queryPost, user.id);
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created',
    content: {
      'application/json': { example: PostViewExample },
    },
  })
  @ApiBadRequestResponse(BadRequestResponseOptions)
  @Post()
  async createPost(@User() user: UserTypes, @Body() body: CreatePostBodyDto) {
    const createResult = await this.commandBus.execute(
      new CreatePostCommand({
        userId: user.id,
        description: body.description,
        images: body.images,
      }),
    );
    if (createResult === HttpStatus.NOT_FOUND) {
      throw new UnauthorizedException();
    }
    return createResult;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing post' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiForbiddenResponse(ForbiddenRequestResponseOptions)
  @ApiNotFoundResponse(NotFoundResponseOptions)
  async updatePost(
    @User() user: UserTypes,
    @Body() body: UpdatePostBodyDto,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const updateResult = await this.commandBus.execute(
      new UpdatePostCommand({
        userId: user.id,
        postId,
        description: body.description,
      }),
    );
    if (updateResult === HttpStatus.NOT_FOUND) {
      const error = createErrorMessage('wrong id', 'id');
      throw new BadRequestException(error);
    }
    if (updateResult === HttpStatus.FORBIDDEN) {
      throw new ForbiddenException();
    }
    return;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing post' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiNotFoundResponse(NotFoundResponseOptions)
  @ApiForbiddenResponse(ForbiddenRequestResponseOptions)
  async deletePost(
    @User() user: UserTypes,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const updateResult = await this.commandBus.execute(
      new DeletePostCommand({
        userId: user.id,
        postId,
      }),
    );
    if (updateResult === HttpStatus.NOT_FOUND) {
      const error = createErrorMessage('wrong id', 'id');
      throw new BadRequestException(error);
    }
    if (updateResult === HttpStatus.FORBIDDEN) {
      throw new ForbiddenException();
    }
    return;
  }

  @Post('images')
  @ApiOperation({ summary: 'Upload image to new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile avatar',
    type: UploadPostImageDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiUnprocessableEntityResponse({
    description: 'invalid file, wrong fileType or maxSize',
  })
  @ApiCreatedResponse({
    description: 'Uploaded images information object.',
    content: {
      'application/json': { example: PostImagesViewExample },
    },
  })
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

  @Delete('images/:imageId')
  @ApiOperation({ summary: 'Delete post`s image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse(NoContentResponseOptions)
  @ApiForbiddenResponse(ForbiddenRequestResponseOptions)
  async deletePostImage(
    @User() user: UserTypes,
    @Param('imageId') imageId: string,
  ) {
    try {
      return this.clientProxy.send(
        { cmd: MicroserviceMessagesEnum.DELETE_POST_IMAGE },
        { userId: user.id, imageId },
      );
    } catch (err) {
      console.log('error on deleting post image');
    }
  }
}
