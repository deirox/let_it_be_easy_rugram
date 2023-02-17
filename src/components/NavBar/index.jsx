import React from "react";
import { useNavigate } from "react-router-dom";
import UserBadge from "../UserBadge";
import "./style.css";

const NavBar = ({ nickname, avatarUrl, userId }) => {
  const navigate = useNavigate();
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Rugram
        </span>
        <UserBadge nickname={nickname} avatarUrl={avatarUrl} userId={userId} />
      </div>
    </div>
  );
};

export default NavBar;
