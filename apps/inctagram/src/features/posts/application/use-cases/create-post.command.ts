import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { ErrorEnum } from '../../../../utils/error-enum';
import { UsersRepository } from '../../../../auth/db/users.repository';

export class CreatePostCommand {
  constructor(
    public userId: number,
    public description: string,
  ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostCommand implements ICommandHandler<CreatePostCommand> {
  constructor(
    protected usersRepository: UsersRepository,
    protected prismaClient: PrismaClient,
  ) {}

  async execute(command: CreatePostCommand) {
    const user = await this.usersRepository.getUserById(+command.userId);
    if (user === null) return ErrorEnum.NOT_FOUND;

    const post = await this.prismaClient.post.create({
      data: {
        description: command.description,
        userId: +command.userId,
      },
    });

    const postImages = await this.prismaClient.postImage.findMany({
      where: { userId: +command.userId, postId: post.id },
    });

    const postImagesView = postImages ? this.mapPostImages(postImages) : [];

    return {
      id: post.id,
      description: post.description,
      images: postImagesView,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userId: command.userId,
    };
  }
}
