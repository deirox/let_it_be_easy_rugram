import { combineReducers } from "redux";
import { photosReducer } from "./photos";
import { postsByUserReduser } from "./postsByUser";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({
  photos: photosReducer,
  users: usersReducer,
  postsByUser: postsByUserReduser,
});
