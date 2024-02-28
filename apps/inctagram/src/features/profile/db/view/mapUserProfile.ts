import { DBProfileAvatarView, DBProfileView } from './profile.view';

export const mapUserProfile = (
  profile: DBProfileView,
  avatar: DBProfileAvatarView | null,
) => {
  return {
    id: profile.userId,
    username: profile.user.username,
    firstName: profile.firstname,
    lastName: profile.lastname,
    city: profile.city,
    birthDate: profile.birthDate,
    aboutMe: profile.aboutMe,
    avatar: avatar
      ? {
          url: 'https://storage.yandexcloud.net/kebab-inctagram/' + avatar.url,
          width: avatar.width,
          height: avatar.height,
          fileSize: avatar.fileSize,
        }
      : null,

    createdAt: profile.createdAt,
  };
};
