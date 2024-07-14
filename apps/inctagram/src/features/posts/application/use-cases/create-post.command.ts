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
import { ConfigService } from '@nestjs/config';

export class CreatePostCommand {
  constructor(public data: CreatePostTypes) {}
}
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    protected profileRepo: ProfileRepository,
    protected postsRepo: PostsRepository,
    private configService: ConfigService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ data }: CreatePostCommand) {
    const userProfile = await this.profileRepo.getUserProfile(data.userId);
    if (userProfile === null) return HttpStatus.NOT_FOUND;
    const newPost = PostEntity.create(data);
    const res = await this.postsRepo.createPost(newPost);
    await this.checkLast4Posts(res.id);
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

  private async checkLast4Posts(postId: number) {
    const secret = this.configService.get('FRONT_VALIDATE_SECRET');
    const frontUrl = this.configService.get('FRONT_PROD');
    if (postId % 4 === 0) {
      await fetch(`${frontUrl}/api/revalidate?secret=${secret}`);
    }
  }
}
