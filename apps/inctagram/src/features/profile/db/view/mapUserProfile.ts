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
    avatars: profile.avatarUrl
      ? {
          url:
            'https://storage.yandexcloud.net/kebab-inctagram/' +
            profile.avatarUrl,
          width: 300,
          height: 300,
          fileSize: 300,
        }
      : null,

    createdAt: profile.createdAt,
  };
};
