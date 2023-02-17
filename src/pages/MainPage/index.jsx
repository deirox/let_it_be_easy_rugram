import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import DetailedCard from "../../components/DetailedCard";
import Layout from "../../components/Layout";
import { getPhotos, sendComment, toggleLike } from "../../redux/actions/photos";
import "./style.css";

const MainPage = () => {
  const photos = useSelector((state) => state.photos.photos);
  const loading = useSelector((state) => state.isPhotosLoading);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const total = useSelector((state) => state.photos.totalPhotos);
  const mutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPhotos(page));
  }, [page]);

  const nextHandler = () => {
    setPage(page + 1);
  };
  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId));
  };
  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendComment(authorizedUser.nickname, photoId, comment));
  };

  return (
    <Layout
      userId={authorizedUser.id}
      nickname={authorizedUser.nickname}
      avatarUrl={authorizedUser.avatarUrl}
    >
      <div className="cnMainPageRoot">
        {loading ? (
          <div className="cnMainPageLoaderContainer">
            <Bars color="#BRFF" height={80} width={80} />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={photos.length}
            next={nextHandler}
            hasMore={photos.length < total}
            loader={
              <div className="cnMainPageLoaderContainer">
                <Bars color="#BRFF" height={15} width={15} />
              </div>
            }
            endMessage={<p className="cnMainPageLoaderContainer">Thats all!</p>}
          >
            {photos.map(({ id, author, imgUrl, comments, likes }, index) => {
              return (
                <DetailedCard
                  key={index}
                  id={id}
                  nickname={author.nickname}
                  avatarUrl={author.avatarUrl}
                  userId={author.id}
                  imgUrl={imgUrl}
                  comments={comments}
                  likes={likes.length}
                  isLikedByUser={likes.includes(authorizedUser.id)}
                  className={"cnMainPageCard"}
                  onLikeClick={onLikeClick}
                  onCommentSendClick={onCommentSendClick}
                  mutateLoading={mutateLoading}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};

export default MainPage;
