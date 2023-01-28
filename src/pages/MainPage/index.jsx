import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import DetailedCard from "../../components/DetailedCard";
import Layout from "../../components/Layout";
import { getPhotos } from "../../redux/actions/photos";
import "./style.css";

const MainPage = () => {
  let commentsDEMO = [
    { userName: "чипушила", text: "ля нефор" },
    { userName: "чипушила2", text: "фу нефор" },
    { userName: "чипушила3", text: "бля нефор" },
    { userName: "чипушила4", text: "ля нефор" },
    { userName: "чипушила5", text: "фу нефор" },
    { userName: "чипушила6", text: "бля нефор" },
  ];
  const photos = useSelector((state) => state.photos.photos);
  const loading = useSelector((state) => state.isPhotosLoading);
  const total = useSelector((state) => state.photos.totalPhotos);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPhotos(page));
  }, [page]);

  const nextHandler = () => {
    setPage(page + 1);
  };

  return (
    <Layout userId="1" nickname="говноед">
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
            {photos.map(({ author, imgUrl, comments, likes }, index) => {
              // console.log(author);

              return (
                <DetailedCard
                  key={index}
                  nickname={author.nickname}
                  avatarUrl={author.avatarUrl}
                  imgUrl={imgUrl}
                  comments={comments}
                  likes={likes.length}
                  isLikedByUsers={true}
                  className={"cnMainPageCard"}
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
