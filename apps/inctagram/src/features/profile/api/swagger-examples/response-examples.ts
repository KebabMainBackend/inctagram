export const ProfileImagesViewExample = {
  'avatar-medium': {
    url: 'https://example.com/image.jpg',
    width: 192,
    height: 192,
    fileSize: 300,
  },
  'avatar-thumbnail': {
    url: 'https://example.com/image.jpg',
    width: 45,
    height: 45,
    fileSize: 300,
  },
};

export const ProfileViewExample = {
  id: 1,
  username: 'user1',
  firstname: 'John',
  lastname: 'Doe',
  city: 'London',
  dateOfBirth: '01-01-2000',
  aboutMe: 'About me',
  avatars: ProfileImagesViewExample,
  createdAt: '2024-02-13T16:27:51.919Z',
};

export const PublicProfilesTotalCountViewExample = {
  totalUsersCount: 50,
};
