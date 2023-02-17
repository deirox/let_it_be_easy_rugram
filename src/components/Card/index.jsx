import "./style.css";

import React, { useState } from "react";
import cn from "classnames";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import PhotoModal from "../PhotoModal";

const Card = ({
  id,
  imgUrl,
  className,
  likes = 0,
  comments,
  isLikedByUser,
  onLikeClick,
  nickname,
  userId,
  avatarUrl,
  isMutateLoading,
  onCommentSendClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const onClose = () => {
    setIsModalOpen(false);
    setComment("");
  };
  const onOpenModal = () => {
    setIsModalOpen(true);
    setComment("");
  };
  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, userId, comment);
      setComment("");
    }
  };
  return (
    <div className={cn("cnCardRoot", className)}>
      <img className="cnCardImage" src={imgUrl} alt="image" />
      <div className="cnCardHover">
        {isLikedByUser ? (
          <FaHeart className="cnCardIcon" color="#fff" onClick={onLikeClick} />
        ) : (
          <FaRegHeart
            className="cnCardIcon"
            color="#fff"
            onClick={onLikeClick}
          />
        )}
        <span className="cnCardNumber">{likes}</span>
        <FaComment className="cnCardIcon" color="#fff" onClick={onOpenModal} />
        <span className="cnCardNumber">{comments?.length}</span>
      </div>
      <PhotoModal
        isOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onClose={onClose}
        userId={userId}
        imgUrl={imgUrl}
        avatarUrl={avatarUrl}
        nickname={nickname}
        comments={comments}
        isLiked={isLikedByUser}
        commentValue={comment}
        setCommentValue={setComment}
        isCommentLoading={isMutateLoading}
        onCommentSubmit={handleSendCommentClick}
        onLikeClick={() => onLikeClick(id)}
      />
    </div>
  );
};

export default Card;
