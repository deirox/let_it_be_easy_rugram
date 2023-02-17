import React from "react";
import NavBar from "../NavBar";
import "./style.css";

const Layout = ({ nickname, avatarUrl, userId, children }) => {
  return (
    <div className="cnLayoutRoot">
      <NavBar nickname={nickname} avatarUrl={avatarUrl} userId={userId} />
      <div className="cnLayoutBody">{children}</div>
    </div>
  );
};

export default Layout;
