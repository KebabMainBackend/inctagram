import { BaseEntity } from '../../../../utils/base.entity';
import { CreatePostTypes } from '../types/create-post.types';

export class PostEntity extends BaseEntity {
  userId: number;
  description?: string;
  images: string[];
  static create(data: CreatePostTypes) {
    const { userId, images, description } = data;
    const post = new PostEntity();
    post.userId = userId;
    post.images = images;
    if (description) {
      post.description = description;
    }
    return post;
  }
}
