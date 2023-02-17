export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_STARTED = "GET_USER_STARTED";
export const GET_AUTHORIZED_USER_STARTED = "GET_AUTHORIZED_USER_STARTED";
export const GET_AUTHORIZED_USER_FAILED = "GET_AUTHORIZED_USER_FAILED";
export const GET_AUTHORIZED_USER_SUCCESS = "GET_AUTHORIZED_USER_SUCCESS";

export const getUserStarted = () => ({
  type: GET_USER_STARTED,
});
export const getUserFailed = (error) => ({
  type: GET_USER_FAILED,
  payload: error,
});
export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
export const getAuthorizedUserStarted = (authorizedUser) => ({
  type: GET_AUTHORIZED_USER_STARTED,
  payload: authorizedUser,
});
export const getAuthorizedUserFailed = (error) => ({
  type: GET_AUTHORIZED_USER_FAILED,
  payload: error,
});
export const getAuthorizedUserSuccess = (user) => ({
  type: GET_AUTHORIZED_USER_SUCCESS,
  payload: user,
});
