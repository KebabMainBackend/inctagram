import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsQueryRepository } from '../db/posts.query-repository';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CursorQueryOptions,
  PageSizeQueryOptions,
  SortByQueryOptions,
  SortDirectionQueryOptions,
  UserIdQueryOptions,
} from '../../../utils/constants/swagger-constants';
import { GetDefaultUriDtoWithCursor } from '../../../utils/default-get-query.uri.dto';
import { GetRequestPostsViewExample } from './swagger-examples/response-examples';
import { DefaultUserIdQueryUriDto } from '../../../utils/default-user-id-query.uri.dto';

@ApiTags('Public-Posts')
@Controller('public-posts')
export class PublicPostsController {
  constructor(protected postsQueryRepository: PostsQueryRepository) {}
  @ApiOperation({ summary: 'Get all user`s posts' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': { example: GetRequestPostsViewExample },
    },
  })
  @Get('user/:userId')
  @ApiQuery(
    CursorQueryOptions(
      'ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.',
    ),
  )
  @ApiQuery(SortDirectionQueryOptions)
  @ApiQuery(SortByQueryOptions)
  @ApiQuery(PageSizeQueryOptions)
  async getUserPosts(
    @Query() queryPost: GetDefaultUriDtoWithCursor,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const data = await this.postsQueryRepository.findPosts(queryPost, userId);
    return { userId, ...data };
  }

  @ApiOperation({ summary: 'Get all public posts' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': { example: GetRequestPostsViewExample },
    },
  })
  @Get('all')
  @ApiQuery(
    CursorQueryOptions(
      'ID of the last uploaded post. If endCursorPostId not provided, the first set of posts is returned.',
    ),
  )
  @ApiQuery(SortDirectionQueryOptions)
  @ApiQuery(SortByQueryOptions)
  @ApiQuery(PageSizeQueryOptions)
  async getAllPublicPosts(@Query() queryPost: GetDefaultUriDtoWithCursor) {
    return await this.postsQueryRepository.findPosts(queryPost);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiQuery(UserIdQueryOptions)
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': { example: GetRequestPostsViewExample },
    },
  })
  @Get(':postId')
  async getPostById(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() query: DefaultUserIdQueryUriDto,
  ) {
    const post = await this.postsQueryRepository.getPostById(postId);
    if (post) {
      if (query.userId) {
        if (+query.userId === post.ownerId) {
          return post;
        }
        throw new HttpException('wrong userId', HttpStatus.BAD_REQUEST);
      }
      return post;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
