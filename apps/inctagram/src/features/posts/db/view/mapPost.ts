import { DBPostImageType, DBPostType, PostView } from './post.view';
import { DBProfileView } from '../../../profile/db/view/profile.view';

type PostMapperInput = {
  post: DBPostType;
  profile: DBProfileView;
  postImages: DBPostImageType[];
  userAvatar: string | null;
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
    avatarOwner: userAvatar ? process.env.FILES_STORAGE_URL + userAvatar : null,
    owner: {
      lastname: profile.lastname,
      firstname: profile.firstname,
    },
  };
};

export const mapPostImages = (images: DBPostImageType[]) => {
  return images.map((image) => ({
    url: process.env.FILES_STORAGE_URL + image.url,
    width: image.width,
    height: image.height,
    fileSize: image.fileSize,
    uploadId: image.fileId,
  }));
};
