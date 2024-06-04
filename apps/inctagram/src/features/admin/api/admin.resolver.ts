import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UserModel } from '../db/entities/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { ProfileModel } from '../db/entities/profile.model';
import {
  GetUserPaymentsQueryDto,
  GetUsersPaymentsQueryDto,
  GetUsersQueryDto,
} from './dto/get-users.dto';
import { UsersQueryRepository } from '../db/users.query-repository';
import {
  PostsPaginationModel,
  UserPaginationModel,
  UserPaymentsPaginationModel,
  UsersPaymentsPaginationModel,
} from '../db/entities/return.model';
import { ImageModel } from '../db/entities/file.model';
import { DeleteUserCommand } from '../application/delete-user.command';
import { UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../../../auth/guards/basic-auth.guard';
import { ChangeBanStatusOfUserCommand } from '../application/ban-user.command';
import { BanStatus } from '../../../types/ban.types';
import { PostModel } from '../db/entities/post.model';
import { PostsQueryRepository } from '../../posts/db/posts.query-repository';
import { GetPostsQueryDto } from './dto/get-posts.dto';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => UserModel)
export class AdminResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private pubSub: PubSub,
    private userQueryRepo: UsersQueryRepository,
    private postsQueryRepo: PostsQueryRepository,
  ) {}

  @Query(() => UserPaginationModel, {
    name: 'getUsers',
    nullable: true,
  })
  @UseGuards(BasicAuthGuard)
  async findAll(@Args() args: GetUsersQueryDto): Promise<UserPaginationModel> {
    return this.userQueryRepo.getAllUsers(args);
  }

  @Query(() => ProfileModel, { name: 'getUser' })
  @UseGuards(BasicAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userQueryRepo.getUser(id);
  }

  @Query(() => UserPaymentsPaginationModel, { name: 'getPaymentsOfUser' })
  @UseGuards(BasicAuthGuard)
  findOnePayments(
    @Args() args: GetUserPaymentsQueryDto,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.userQueryRepo.getUserPayments(args, id);
  }

  @Query(() => UsersPaymentsPaginationModel, { name: 'getAllPayments' })
  @UseGuards(BasicAuthGuard)
  findAllPayments(@Args() args: GetUsersPaymentsQueryDto) {
    return this.userQueryRepo.getUsersPayments(args);
  }

  @Query(() => [ImageModel], {
    name: 'getPhotosOfUser',
    nullable: 'itemsAndList',
  })
  @UseGuards(BasicAuthGuard)
  findOnePosts(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.userQueryRepo.getUserPhotos(id);
  }

  @Mutation(() => String, {
    name: 'deleteUser',
  })
  @UseGuards(BasicAuthGuard)
  async deleteUser(@Args('userId', { type: () => Int }) userId: number) {
    const isDeleted = await this.commandBus.execute(
      new DeleteUserCommand(userId),
    );
    if (isDeleted) {
      return 'deleted';
    }
    return 'not deleted';
  }
  @Mutation(() => Boolean, {
    name: 'checkAdmin',
  })
  async checkAdmin(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    return (
      login === process.env.ADMIN_LOGIN &&
      password === process.env.ADMIN_PASSWORD
    );
  }

  @Mutation(() => String, {
    name: 'banUser',
  })
  @UseGuards(BasicAuthGuard)
  async banUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('status', { type: () => BanStatus }) status: BanStatus,
    @Args('reason') reason: string,
    // @Args('data') data: ChangeBanStatusOfUserInput,
  ): Promise<string> {
    const isChange = await this.commandBus.execute(
      new ChangeBanStatusOfUserCommand(userId, status, reason),
    );
    if (isChange) return 'changed';
    return 'unchanged';
  }

  @Query(() => PostsPaginationModel)
  async getAllPosts(@Args() args: GetPostsQueryDto) {
    return this.postsQueryRepo.findPosts(args);
  }

  @Subscription(() => PostModel)
  postAdded() {
    return this.pubSub.asyncIterator('postAdded');
  }
}
