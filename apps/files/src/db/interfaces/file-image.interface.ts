import { ObjectId } from 'mongoose';
import { FileImageAvatarTypeEnum } from '../../../../../types/file-image-enum.types';

export interface FileImageInterface extends Document {
  id: ObjectId;
  fileSize: number;
  url: string;
  width: number;
  height: number;
  type: FileImageAvatarTypeEnum;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}
