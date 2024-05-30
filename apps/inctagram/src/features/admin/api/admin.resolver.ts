import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserModel } from '../db/entities/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { ProfileModel } from '../db/entities/profile.model';
import { GetUserPaymentsQueryDto, GetUsersQueryDto } from './dto/get-users.dto';
import { UsersQueryRepository } from '../db/users.query-repository';
import {
  UserPaginationModel,
  UserPaymentsPaginationModel,
} from '../db/entities/return.model';
import { ImageModel } from '../db/entities/file.model';
import { DeleteUserCommand } from '../application/delete-user.command';
import { UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../../../auth/guards/basic-auth.guard';
import { ChangeBanStatusOfUserInput } from './dto/change-ban-status-of-user.input';
import { ChangeBanStatusOfUserCommand } from '../application/ban-user.command';
import { BanStatus } from '../../../types/ban.types';

@Resolver(() => UserModel)
export class AdminResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private userQueryRepo: UsersQueryRepository,
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
    return this.userQueryRepo.getUserPayments(id, args);
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
}
