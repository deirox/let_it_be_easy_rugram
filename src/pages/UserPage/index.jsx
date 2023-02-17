import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { sendComment, toggleLike } from "../../redux/actions/photos";
import {
  getPostsByUser,
  sendCommentOnPost,
  toggleLikeOnPost,
} from "../../redux/actions/postsByUser";
import { getAuthorizedUser, getUser } from "../../redux/actions/users";
import "./style.css";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const user = useSelector((state) => state.users.user);
  const isUserLoading = useSelector((state) => state.users.isUserLoading);
  const isPostsLoading = useSelector(
    (state) => state.postsByUser.isPostsLoading
  );
  const isMutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const postsByUser = useSelector((state) => state.postsByUser.posts);

  const dispatch = useDispatch();
  const onLikeClick = (photoId, postAuthorId) => {
    dispatch(toggleLikeOnPost(authorizedUser.id, photoId, postAuthorId));
  };
  const onCommentSendClick = (photoId, postAuthorId, comment) => {
    dispatch(
      sendCommentOnPost(authorizedUser.nickname, photoId, postAuthorId, comment)
    );
  };

  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getPostsByUser(userId));
  }, [userId]);

  return (
    <Layout
      userId={authorizedUser.id}
      nickname={authorizedUser.nickname}
      avatarUrl={authorizedUser.avatarUrl}
    >
      {isUserLoading || isPostsLoading ? (
        <div>loader</div>
      ) : (
        <div className="cnUserPageRoot">
          <UserBio
            avatarUrl={user.avatarUrl}
            nickname={user.nickname}
            subscribed={user.subscribed?.length}
            subscribers={user.subscribers?.length}
            firstName={user.firstName}
            lastName={user.lastName}
            description={user.description}
            url={user.url}
            isMyPage={String(userId) === String(authorizedUser.id)}
            isSubscribed={user.subscribers?.includes(authorizedUser.id)}
          />
          <div className="cnUserPageRootContent">
            {postsByUser.length ? (
              postsByUser.map(({ id, author, likes, comments, imgUrl }) => {
                return (
                  <Card
                    key={id}
                    className={"cnUserPageCard"}
                    likes={likes.length}
                    commentsLength={comments.length}
                    comments={comments}
                    imgUrl={imgUrl}
                    nickname={author.nickname}
                    id={id}
                    userId={author.id}
                    avatarUrl={author.avatarUrl}
                    isLikedByUser={likes.includes(authorizedUser.id)}
                    onLikeClick={() => onLikeClick(id, author.id)}
                    isMutateLoading={isMutateLoading}
                    onCommentSendClick={onCommentSendClick}
                  />
                );
              })
            ) : (
              <p style={{ margin: "0 auto", fontSize: "24px" }}>
                У этого пользователя нет постов!
              </p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
