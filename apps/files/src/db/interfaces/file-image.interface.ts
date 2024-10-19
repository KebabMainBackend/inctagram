import { ObjectId } from 'mongoose';
import { FileCommandTypesEnum } from '../../../../../types/file-image-enum.types';

export interface FileImageInterface extends Document {
  id: ObjectId;
  fileSize: number;
  url: string;
  width: number;
  height: number;
  type: FileCommandTypesEnum;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}
