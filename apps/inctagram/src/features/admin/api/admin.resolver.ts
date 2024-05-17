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

@Resolver(() => UserModel)
export class AdminResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private userQueryRepo: UsersQueryRepository,
  ) {}

  @Query(() => UserPaginationModel, { name: 'getUsers' })
  async findAll(@Args() args: GetUsersQueryDto): Promise<UserPaginationModel> {
    return this.userQueryRepo.getAllUsers(args);
  }

  @Query(() => ProfileModel, { name: 'getUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userQueryRepo.getUser(id);
  }

  @Query(() => UserPaymentsPaginationModel, { name: 'getPaymentsOfUser' })
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
  findOnePosts(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.userQueryRepo.getUserPhotos(id);
  }

  @Mutation(() => String)
  async deleteUser(@Args('userId', { type: () => Int }) userId: number) {
    const isDeleted = await this.commandBus.execute(
      new DeleteUserCommand(userId),
    );
    if (isDeleted) {
      return 'deleted';
    }
    return 'not deleted';
  }
}
