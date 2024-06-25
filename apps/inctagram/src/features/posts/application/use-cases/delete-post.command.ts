import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../db/posts.repository';
import { HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FilesMicroserviceMessagesEnum } from '../../../../../../../types/messages';
import { firstValueFrom } from 'rxjs';
type DeletePostInputType = {
  userId: number;
  postId: number;
};
export class DeletePostCommand {
  constructor(public data: DeletePostInputType) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    protected postsRepo: PostsRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ data }: DeletePostCommand) {
    const post = await this.postsRepo.getPostById(data.postId);
    if (!post) return HttpStatus.NOT_FOUND;
    if (post.userId !== data.userId) return HttpStatus.FORBIDDEN;
    if (post.images.length) {
      const pattern = { cmd: FilesMicroserviceMessagesEnum.DELETE_POST_IMAGES };
      const payload = {
        imagesIds: post.images,
      };
      const value = await firstValueFrom(this.client.send(pattern, payload));
      console.log(value);
    }

    await this.postsRepo.deletePost(data.postId);

    return true;
  }
}
