import { BaseEntity } from '../../../../utils/base.entity';
import { FileImageTypes } from '../types/file-image.types';
import sizeOf from 'image-size';

export class FileImageEntity extends BaseEntity {
  profileUserId: number;
  url: string;
  fileSize: number;
  width: number;
  height: number;

  static create(data: FileImageTypes, userId: number) {
    const { fileSize, imageUrl, buffer } = data;
    const { width, height } = sizeOf(buffer);

    const avatar = new FileImageEntity();
    avatar.profileUserId = userId;
    avatar.height = height;
    avatar.width = width;
    avatar.url = imageUrl;
    avatar.fileSize = fileSize;
    return avatar;
  }
}
