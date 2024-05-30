import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ImageModel {
  @Field({ description: 'file id' })
  id: string;

  @Field({ description: 'file url' })
  url: string;

  @Field({ description: 'file createdAt' })
  createdAt: string;

  @Field({ description: 'file type' })
  type: string;
}

@ObjectType()
export class AvatarModel {
  @Field({ description: 'file url' })
  url: string;

  @Field(() => Int, { description: 'file width' })
  width: number;
  @Field(() => Int, { description: 'file height' })
  height: number;

  @Field(() => Int, { description: 'file fileSize' })
  fileSize: number;
}

@ObjectType()
export class AvatarsModel {
  @Field(() => AvatarModel, { description: 'file url', nullable: true })
  thumbnail: AvatarModel;
  @Field(() => AvatarModel, { description: 'file url', nullable: true })
  medium: AvatarModel;
}
