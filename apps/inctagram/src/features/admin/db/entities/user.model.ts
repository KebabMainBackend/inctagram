import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProfileModel } from './profile.model';

@ObjectType()
export class UserModel {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field({ description: 'user full name' })
  fullName: string;

  @Field({ description: 'username' })
  username: string;

  @Field({ description: 'user email' })
  email: string;

  @Field({ description: 'user createdAt' })
  createdAt: string;

  @Field(() => ProfileModel, { description: 'user profile', nullable: true })
  profile?: ProfileModel;
}
