import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileImageInterface } from '../../db/interfaces/file-image.interface';
import { S3StorageManager } from '../../adapters/s3-storage.adapter';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
export class DeleteFileCommand {
  constructor(public url: string) {}
}

@CommandHandler(DeleteFileCommand)
export class DeleteFileHandler implements ICommandHandler<DeleteFileCommand> {
  constructor(
    public s3Manager: S3StorageManager,
    @Inject('FILE_MODEL')
    private fileImageModel: Model<FileImageInterface>,
  ) {}
  async execute({ url }: DeleteFileCommand) {
    await this.s3Manager.deleteImage(url);
    await this.fileImageModel.deleteOne({
      url,
    });
    return true;
  }
}
