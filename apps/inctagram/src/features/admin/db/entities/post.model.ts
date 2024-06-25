import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OwnerModel } from './profile.model';
import { AvatarsModel, ImageModel } from './file.model';
import { BanStatus } from '../../../../types/ban.types';

@ObjectType()
export class PostModel {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field(() => [ImageModel], { description: 'post images', nullable: true })
  images: ImageModel[];

  @Field(() => Int, { description: 'post ownerId' })
  ownerId: number;

  @Field({ description: 'post description', nullable: true })
  description: string;

  @Field({ description: 'post createdAt' })
  createdAt: Date;

  @Field({ description: 'post createdAt' })
  updatedAt: Date;

  @Field(() => OwnerModel, { description: 'post owner' })
  owner: OwnerModel;
  @Field(() => BanStatus, { description: 'user ban status' })
  status: BanStatus;

  @Field({ nullable: true, description: 'user avatar' })
  avatarOwner: string;

  @Field({ description: 'username' })
  username: string;
}
