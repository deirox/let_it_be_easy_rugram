import { useEffect } from "react";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import ReactModal from "react-modal";
import Comment from "../Comment";
import TextArea from "../TextArea";
import UserBadge from "../UserBadge";
import "./style.css";

const PhotoModal = ({
  isOpen,
  onOpenModal,
  onClose,
  imgUrl,
  nickname,
  avatarUrl,
  userId,
  comments,
  onCommentSubmit,
  commentValue,
  setCommentValue,
  isCommentLoading,
  isLiked,
  onLikeClick,
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("cnBodyOverflow");
    } else {
      body.classList.remove("cnBodyOverflow");
    }
  }, [isOpen]);

  return (
    <ReactModal
      className="cnModal"
      overlayClassName="cnModalOverlay"
      isOpen={isOpen}
      onAfterOpen={onOpenModal}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="cnModalRoot">
        <div className="cnModalImageWrapper">
          <img className="cnModalImage" src={imgUrl} alt={imgUrl} />
        </div>
        <div className="cnModalCommentsBlock">
          <div>
            <div className="cnModalHeader">
              <UserBadge
                nickname={nickname}
                avatarUrl={avatarUrl}
                userId={userId}
              />
            </div>
            <div className="cnModalComments">
              {comments?.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>
          </div>
          <div>
            <div className="cnModalIcons">
              {isLiked ? (
                <FaHeart className="cnModalLikeIcon" onClick={onLikeClick} />
              ) : (
                <FaRegHeart className="cnModalLikeIcon" onClick={onLikeClick} />
              )}
            </div>
            <TextArea
              value={commentValue}
              setValue={setCommentValue}
              placeholder="Введите комментарий"
              isLoading={isCommentLoading}
              onSubmit={onCommentSubmit}
              buttonText="Отправить"
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default PhotoModal;
