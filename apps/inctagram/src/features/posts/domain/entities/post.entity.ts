import { BaseEntity } from '../../../../utils/base.entity';
import { CreatePostTypes } from '../types/create-post.types';
import { PostStatusEnum } from '../types/post.enum';

export class PostEntity extends BaseEntity {
  userId: number;
  description?: string;
  images: string[];
  status: PostStatusEnum;
  static create(data: CreatePostTypes) {
    const { userId, images, description } = data;
    const post = new PostEntity();
    post.userId = userId;
    post.images = images;
    post.status = PostStatusEnum.ACTIVE;
    if (description) {
      post.description = description;
    }
    return post;
  }
}
