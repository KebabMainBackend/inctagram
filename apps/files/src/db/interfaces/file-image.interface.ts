import { ObjectId } from 'mongoose';
import { FileImageTypeEnum } from '../../../../../types/file-image-enum.types';

export interface FileImageInterface extends Document {
  id: ObjectId;
  fileSize: number;
  url: string;
  width: number;
  height: number;
  type: FileImageTypeEnum;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}
