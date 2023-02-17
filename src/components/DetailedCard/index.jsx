import React, { useState } from "react";
import UserBadge from "../UserBadge";
import "./style.css";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import Comment from "../Comment";
import cn from "classnames";
import Button from "../Button";
import PhotoModal from "../PhotoModal";
import TextArea from "../TextArea";

const DetailedCard = ({
  nickname,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByUser,
  comments,
  className,
  onLikeClick,
  id,
  onCommentSendClick,
  mutateLoading,
}) => {
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComments] = useState("");

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment);
      setComments("");
    }
  };
  const renderComments = (comments) => {
    if (comments.length > 2 && !isCommentsShow) {
      const commentsForRender = [...comments].slice(
        comments.length - 2,
        comments.length
      );

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
  const onClose = () => {
    setIsModalOpen(false);
    setComments("");
  };
  const onOpenModal = () => {
    setIsModalOpen(true);
    setComments("");
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
        {isLikedByUser ? (
          <FaHeart onClick={() => onLikeClick(id)} size={18} />
        ) : (
          <FaRegHeart onClick={() => onLikeClick(id)} size={18} />
        )}
        <FaComment size={18} onClick={() => setIsModalOpen(true)} />
      </div>
      <div className="cnDetailedCardLikes">{`Оценили ${likes} человек XD`}</div>
      <div className="cnDetailedCardComments">{renderComments(comments)}</div>
      <TextArea
        value={comment}
        setValue={setComments}
        placeholder="Введите комментарий"
        isLoading={mutateLoading}
        onSubmit={handleSendCommentClick}
        buttonText="Отправить"
      />
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
        setCommentValue={setComments}
        onCommentSubmit={handleSendCommentClick}
        isCommentLoading={mutateLoading}
        onLikeClick={() => onLikeClick(id)}
      />
    </div>
  );
};

export default DetailedCard;
