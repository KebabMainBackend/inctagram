import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AvatarsModel } from './file.model';

@ObjectType()
export class ProfileModel {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field({ description: 'user firstname', nullable: true })
  firstname: string;
  @Field({ description: 'user firstname', nullable: true })
  lastname: string;

  @Field({ description: 'username' })
  username: string;

  @Field({ description: 'user createdAt' })
  createdAt: string;

  @Field({ description: 'birthDate', nullable: true })
  birthDate: string;

  @Field({ description: 'user city', nullable: true })
  city: string;

  @Field({ description: 'about user', nullable: true })
  aboutMe: string;

  @Field({ description: 'accountType user' })
  accountType: string;

  @Field(() => AvatarsModel, { nullable: true, description: 'user avatar' })
  avatars: AvatarsModel;
}
