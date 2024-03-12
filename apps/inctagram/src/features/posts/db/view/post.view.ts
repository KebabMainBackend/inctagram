import { PostStatus } from '@prisma/client';

export type DBPostType = {
  id: number;
  description: string;
  status: PostStatus;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type PostView = {
  id: number;
  username: string;
  description: string;
  location: string;
  images: PostImageView[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  avatarOwner: string;
  owner: {
    firstname: string;
    lastname: string;
  };
};

export type DBPostImageType = {
  fileId: string;
  url: string;
  width: number;
  height: number;
  fileSize: number;
  type: string;
};

export type PostImageView = {
  uploadId: string;
  url: string;
  width: number;
  height: number;
  fileSize: number;
};
