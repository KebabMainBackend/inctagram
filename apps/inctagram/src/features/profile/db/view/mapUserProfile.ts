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
    avatar: profile.avatar
      ? {
          url:
            'https://storage.yandexcloud.net/kebab-inctagram/' +
            profile.avatar.url,
          width: profile.avatar.width,
          height: profile.avatar.height,
          fileSize: profile.avatar.fileSize,
        }
      : null,

    createdAt: profile.createdAt,
  };
};
