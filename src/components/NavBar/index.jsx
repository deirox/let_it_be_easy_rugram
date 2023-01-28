import React from "react";
import { useNavigate } from "react-router-dom";
import UserBadge from "../UserBadge";
import "./style.css";

const NavBar = ({ userName, avatarUrl, userId }) => {
  const navigate = useNavigate();
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <span onClick={() => navigate("/")}>Rugram</span>
        <UserBadge userName={userName} avatarUrl={avatarUrl} userId={userId} />
      </div>
    </div>
  );
};

export default NavBar;
