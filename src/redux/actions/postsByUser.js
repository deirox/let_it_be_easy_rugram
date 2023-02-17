import { api } from "../../api";
import { getUserPagePostData } from "../../utils";
import {
  mutatePhotoFailed,
  mutatePhotoStarted,
  mutatePhotoSuccess,
} from "../actionCreaters/photos";
import {
  getPostsFailed,
  getPostsStarted,
  getPostsSuccess,
} from "../actionCreaters/postsByUser";

export const getPostsByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(getPostsStarted());
      const response = await api.postsByUser.getPostsByUser({
        url: `/${userId}`,
      });
      dispatch(getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(getPostsFailed(error));
    }
  };
};

export const toggleLikeOnPost = (userId, postId, postAuthorId) => {
  return async (dispatch, getState) => {
    try {
      const posts = getState().postsByUser.posts;
      const { newPosts, postForEdit } = getUserPagePostData(posts, postId);

      if (postForEdit.likes.includes(userId)) {
        postForEdit.likes = postForEdit.likes.filter((like) => like !== userId);
      } else {
        postForEdit.likes.push(userId);
      }

      await api.postsByUser.mutatePosts({
        url: `/${postAuthorId}`,
        data: {
          id: postAuthorId,
          posts: newPosts,
        },
      });
      dispatch(getPostsSuccess(newPosts));
    } catch (error) {
      dispatch(getPostsFailed);
    }
  };
};

export const sendCommentOnPost = (nickname, postId, postAuthorId, text) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const posts = getState().postsByUser.posts;
    const { newPosts, postForEdit } = getUserPagePostData(posts, postId);

    postForEdit.comments.push({ nickname, text });
    try {
      const response = await api.postsByUser.mutatePosts({
        url: `/${postAuthorId}`,
        data: {
          id: postAuthorId,
          posts: newPosts,
        },
      });

      dispatch(getPostsSuccess([...response.data.posts]));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};
