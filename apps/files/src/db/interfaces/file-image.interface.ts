import { ObjectId } from 'mongoose';
export enum FileImageTypeEnum {
  AVATAR = 'AVATAR',
}

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
