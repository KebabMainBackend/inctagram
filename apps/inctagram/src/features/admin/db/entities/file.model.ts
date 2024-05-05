import { ObjectType, Field } from '@nestjs/graphql';
import { FileImageTypeEnum } from '../../../../../../../types/file-image-enum.types';

@ObjectType()
export class ImageModel {
  @Field({ description: 'file id' })
  id: string;

  @Field({ description: 'file url' })
  url: string;

  @Field({ description: 'file createdAt' })
  createdAt: string;

  @Field(() => FileImageTypeEnum, { description: 'user createdAt' })
  type: FileImageTypeEnum;
}
