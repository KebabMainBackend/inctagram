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
  avatar: {
    url: string;
    width: number;
    height: number;
    fileSize: number;
  };
};

export const ProfileViewExample = {
  id: 1,
  userName: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  city: 'London',
  dateOfBirth: '2020-01-01',
  aboutMe: 'About me',
  avatars: [
    {
      url: 'https://example.com/image.jpg',
      width: 300,
      height: 300,
      fileSize: 300,
    },
  ],
  createdAt: '2024-02-13T16:27:51.919Z',
};
