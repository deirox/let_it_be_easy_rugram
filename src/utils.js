export const getPhotoFromState = (photos, photoId) => {
  const photo = photos.find((elem) => elem.id === photoId);
  return { ...photo };
};
export const getUpdatedPhotoFromState = (photos, photoId, data) => {
  const newPhotos = [...photos];
  const photoIndex = newPhotos.findIndex((photo) => photo.id === photoId);
  newPhotos[photoIndex] = data;
  return newPhotos;
};

export const getUserPagePostData = (posts, postId) => {
  const newPosts = [...posts];
  const newPostIndex = newPosts.findIndex((post) => post.id === postId);
  const postForEdit = newPosts[newPostIndex];
  return {
    newPosts,
    newPostIndex,
    postForEdit,
  };
};
