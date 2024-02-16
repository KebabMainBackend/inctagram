import { DBProfileView } from './profile.view';

export const mapUserProfile = (profile: DBProfileView) => {
  return {
    id: profile.userId,
    username: profile.user.username,
    firstName: profile.firstname,
    lastName: profile.lastname,
    city: profile.city,
    birthDate: profile.birthDate,
    aboutMe: profile.aboutMe,
    avatars: [
      {
        url: 'https://example.com/image.jpg',
        width: 300,
        height: 300,
        fileSize: 300,
      },
    ],
    createdAt: profile.createdAt,
  };
};
