import { FileImageAvatarTypeEnum } from '../../../../../../../types/file-image-enum.types';

export type DBProfileView = {
  userId: number;
  firstname: string;
  lastname: string;
  birthDate: string;
  aboutMe: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
  };
};

export type DBProfileUserImages = DBProfileImageView[];
export type DBProfileImageView = {
  id: string;
  url: string;
  width: number;
  height: number;
  fileSize: number;
  type: FileImageAvatarTypeEnum;
};

export const ProfileImagesViewExample = {
  avatar: {
    url: 'https://example.com/image.jpg',
    width: 192,
    height: 192,
    fileSize: 300,
  },
  thumbnail: {
    url: 'https://example.com/image.jpg',
    width: 45,
    height: 45,
    fileSize: 300,
  },
};

export const ProfileViewExample = {
  id: 1,
  userName: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  city: 'London',
  dateOfBirth: '2020-01-01',
  aboutMe: 'About me',
  avatars: ProfileImagesViewExample,
  createdAt: '2024-02-13T16:27:51.919Z',
};
