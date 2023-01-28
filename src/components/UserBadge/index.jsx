import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UserBadge = ({ nickname, avatarUrl, userId }) => {
  const navigate = useNavigate();
  const onUserBadgeClick = () => {
    navigate(`/${userId}`);
  };
  return (
    <div className="cnUserBadgeRoot" onClick={onUserBadgeClick}>
      {avatarUrl ? (
        <img className="cnUserBadgeAvatar" src={avatarUrl} alt="logo" />
      ) : (
        <div className="cnUserBadgePlaceHolder" />
      )}
      <span className="cnUserBadgeName">{nickname}</span>
    </div>
  );
};

export default UserBadge;
