import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { mapPostsWithImages } from '../../db/view/mapPost';
import { HttpStatus, Inject } from '@nestjs/common';
import { PostsRepository } from '../../db/posts.repository';
import { PostEntity } from '../../domain/entities/post.entity';
import { CreatePostTypes } from '../../domain/types/create-post.types';
import { FilesMicroserviceMessagesEnum } from '../../../../../../../types/messages';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProfileRepository } from '../../../profile/db/profile.repository';

export class CreatePostCommand {
  constructor(public data: CreatePostTypes) {}
}
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    protected profileRepo: ProfileRepository,
    protected postsRepo: PostsRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ data }: CreatePostCommand) {
    const userProfile = await this.profileRepo.getUserProfile(data.userId);
    if (userProfile === null) return HttpStatus.NOT_FOUND;
    const newPost = PostEntity.create(data);
    const res = await this.postsRepo.createPost(newPost);
    const images = await firstValueFrom(this.getImages(data.images));
    const userAvatar: string | null = await this.getUserThumbnailAvatar(
      userProfile.thumbnailId,
    );

    return mapPostsWithImages({
      post: res,
      postImages: images,
      userAvatar,
      profile: userProfile,
    });
  }
  private getImages(imagesIds: string[]) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.GET_POST_IMAGES };
    const payload = {
      imagesIds,
    };
    return this.client.send(pattern, payload);
  }
  private getUserAvatar(imageId: string) {
    const pattern = {
      cmd: FilesMicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR,
    };
    const payload = {
      imageId,
    };
    return this.client.send(pattern, payload);
  }
  private async getUserThumbnailAvatar(imageId: string) {
    const thumbnail = await firstValueFrom(this.getUserAvatar(imageId));
    return thumbnail?.url;
  }
}
