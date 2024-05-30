import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProfileModel } from './profile.model';
import { BanStatus } from '../../../../types/ban.types';

@ObjectType()
export class UserModel {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field({ description: 'user full name', nullable: true })
  fullName: string;

  @Field({ description: 'username' })
  username: string;

  @Field({ description: 'user email' })
  email: string;

  @Field(() => BanStatus, { description: 'user ban status' })
  status: BanStatus;

  @Field({ description: 'user ban reason' })
  reason: string;

  @Field({ description: 'user createdAt' })
  createdAt: string;

  @Field(() => ProfileModel, { description: 'user profile', nullable: true })
  profile?: ProfileModel;
}
