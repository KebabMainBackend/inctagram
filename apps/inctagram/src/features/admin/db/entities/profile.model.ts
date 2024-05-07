import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProfileModel {
  @Field({ description: 'user full name' })
  fullName: string;

  @Field({ description: 'birthDate' })
  birthDate: string;

  @Field({ description: 'user createdAt' })
  createdAt: string;

  @Field({ description: 'user city' })
  city: string;

  @Field({ description: 'about user' })
  aboutMe: string;

  @Field({ description: 'user avatar' })
  avatar: string;
}
