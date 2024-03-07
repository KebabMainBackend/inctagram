interface IPostNPostImage {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  images: string[];
}

export const mapPostsNPostImages = (i: IPostNPostImage) => {
  return {
    id: i.id,
    description: i.description,
    images: mapPostImages(),
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    ownerId: i.userId,
  };
};

export const mapPostImages = () => {};
