import { DBPostImageType, DBPostType, PostView } from './post.view';
import { DBProfileView } from '../../../profile/db/view/profile.view';

type PostMapperInput = {
  post: DBPostType;
  profile: DBProfileView;
  postImages: DBPostImageType[];
  userAvatar: string;
};

export const mapPostsWithImages = ({
  post,
  postImages,
  profile,
  userAvatar,
}: PostMapperInput): PostView => {
  return {
    id: post.id,
    description: post.description,
    images: mapPostImages(postImages),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    ownerId: post.userId,
    username: profile.user.username,
    location: 'location',
    avatarOwner: process.env.FILES_STORAGE_URL + userAvatar,
    owner: {
      lastname: profile.lastname,
      firstname: profile.firstname,
    },
  };
};

export const mapPostImages = (images: DBPostImageType[]) => {
  return images.map((image) => ({
    url: 'https://storage.yandexcloud.net/kebab-inctagram/' + image.url,
    width: image.width,
    height: image.height,
    fileSize: image.fileSize,
    uploadId: image.fileId,
  }));
};
