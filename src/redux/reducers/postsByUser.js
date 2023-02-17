import {
  GET_POSTS_FAILED,
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
} from "../actionCreaters/postsByUser";

const initialState = {
  posts: [],
  isPostsLoading: true,
};

export const postsByUserReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_STARTED:
      return {
        ...state,
        isPostsLoading: true,
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        isPostsLoading: false,
        posts: action,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isPostsLoading: false,
        posts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
