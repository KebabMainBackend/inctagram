export const PostImagesViewExample = {
  images: [
    {
      url: 'https://example.com/image.jpg',
      width: 300,
      height: 300,
      fileSize: 300,
      uploadId: 'string',
    },
  ],
};

export const PostViewExample = {
  id: 1,
  username: 'Alex',
  description: 'description',
  location: 'location',
  images: [
    {
      url: 'https://example.com/image.jpg',
      width: 300,
      height: 300,
      fileSize: 300,
      uploadId: 'string',
    },
  ],
  createdAt: '2024-03-07T16:57:15.304Z',
  updatedAt: '2024-03-07T16:57:15.304Z',
  ownerId: 1,
  avatarOwner:
    'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
  owner: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
};
export const GetRequestPostsViewExample = {
  totalCount: 1,
  pageSize: 8,
  pagesCount: 1,
  cursor: 1,
  items: [PostViewExample],
};
