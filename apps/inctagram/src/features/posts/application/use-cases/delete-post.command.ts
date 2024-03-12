import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../db/posts.repository';
import { HttpStatus } from '@nestjs/common';
type DeletePostInputType = {
  userId: number;
  postId: number;
};
export class DeletePostCommand {
  constructor(public data: DeletePostInputType) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(protected postsRepo: PostsRepository) {}

  async execute({ data }: DeletePostCommand) {
    const post = await this.postsRepo.getPostById(data.postId);
    if (!post) return HttpStatus.NOT_FOUND;
    if (post.userId !== data.userId) return HttpStatus.FORBIDDEN;

    await this.postsRepo.deletePost(data.postId);

    return true;
  }
}
