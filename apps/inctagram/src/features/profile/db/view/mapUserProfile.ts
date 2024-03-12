import { DBProfileUserImages, DBProfileView } from './profile.view';

export const mapUserProfile = (
  profile: DBProfileView,
  avatars: DBProfileUserImages | null,
) => {
  return {
    id: profile.userId,
    username: profile.user.username,
    firstname: profile.firstname,
    lastname: profile.lastname,
    city: profile.city,
    birthDate: profile.birthDate,
    aboutMe: profile.aboutMe,
    avatars: avatars.length ? mapUserImages(avatars) : null,
    createdAt: profile.createdAt,
  };
};

export const mapUserImages = (avatars: DBProfileUserImages) => {
  const obj = {};
  avatars.forEach((x) => {
    obj[x.type] = {
      url: 'https://storage.yandexcloud.net/kebab-inctagram/' + x.url,
      width: x.width,
      height: x.height,
      fileSize: x.fileSize,
    };
  });
  return obj;
};
