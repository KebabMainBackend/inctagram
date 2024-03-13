import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../db/posts.repository';
import { HttpStatus } from '@nestjs/common';
type UpdatePostInputType = {
  userId: number;
  postId: number;
  description: string;
};
export class UpdatePostCommand {
  constructor(public data: UpdatePostInputType) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(protected postsRepo: PostsRepository) {}

  async execute({ data }: UpdatePostCommand) {
    const post = await this.postsRepo.getPostById(data.postId);
    if (!post) return HttpStatus.NOT_FOUND;
    if (post.userId !== data.userId) return HttpStatus.FORBIDDEN;

    await this.postsRepo.updatePost(data.postId, {
      description: data.description,
    });

    return true;
  }
}
