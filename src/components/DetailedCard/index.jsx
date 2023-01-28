import React, { useState } from "react";
import UserBadge from "../UserBadge";
import "./style.css";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import Comment from "../Comment";
import cn from "classnames";

const DetailedCard = ({
  nickname,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByUsers,
  comments,
  className,
}) => {
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  const renderComments = (comments) => {
    if (comments.length > 2 && !isCommentsShow) {
      const commentsForRender = [...comments].slice(
        comments.length - 2,
        comments.length
      );
      // console.log(commentsForRender);

      return (
        <>
          <span
            className="cnDetailedCardCommentTitle"
            onClick={() => setIsCommentsShow(true)}
          >{`Показать ещё ${comments.length - 2} комментариев`}</span>
          {commentsForRender.map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
        </>
      );
    }
    return comments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ));
  };
  return (
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickname={nickname} avatarUrl={avatarUrl} userId={userId} />
      </div>
      <div>
        <img className="cnDetailedCardImage" src={imgUrl} alt="img" />
      </div>
      <div className="cnDetailedCardButtons">
        {isLikedByUsers ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        <FaComment size={18} />
      </div>
      <div className="cnDetailedCardLikes">{`Оценили ${likes} человек XD`}</div>
      <div className="cnDetailedCardComments">{renderComments(comments)}</div>
      <textarea className="cnDetailedCardTextarea" />
    </div>
  );
};

export default DetailedCard;
