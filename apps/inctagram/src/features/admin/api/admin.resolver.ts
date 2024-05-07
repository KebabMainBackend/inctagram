import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserModel } from '../db/entities/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { ProfileModel } from '../db/entities/profile.model';
import { GetUsersQueryDto } from './dto/get-users.dto';
import { UsersQueryRepository } from '../db/users.query-repository';
import { UserPaginationModel } from '../db/entities/return.model';

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

  @Query(() => UserModel, { name: 'getUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return id;
    // return this.adminService.findOne(id);
  }

  @ResolveField('profile', () => ProfileModel)
  async posts(@Parent() user: UserModel) {
    const { id } = user;
    console.log(id);
    // return this.postsService.findAll({ authorId: id });
  }

  // @Mutation(() => User)
  // updateAdmin(@Args('updateAdminInput') updateAdminInput: CreateAdminInput) {
  //   return this.adminService.update(updateAdminInput.id, updateAdminInput);
  // }

  @Mutation(() => UserModel)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    // return this.adminService.remove(id);
  }
}
