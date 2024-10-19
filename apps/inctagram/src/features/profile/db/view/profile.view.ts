import { AccountType } from '@prisma/client';
import { FileCommandTypesEnum } from '../../../../../../../types/file-image-enum.types';

export type DBProfileView = {
  userId: number;
  firstname: string;
  lastname: string;
  birthDate: string;
  aboutMe: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: any;
  accountType: AccountType;
};

export type DBProfileUserImages = DBProfileImageView[];
export type DBProfileImageView = {
  id: string;
  url: string;
  width: number;
  height: number;
  fileSize: number;
  type: FileCommandTypesEnum;
};
