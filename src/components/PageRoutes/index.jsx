import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import NoAccessPage from "../../pages/NoAccessPage";
import UserPage from "../../pages/UserPage";
import { getAuthorizedUser } from "../../redux/actions/users";
import "./style.css";

const authorizedRoutes = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/:userId", element: <UserPage />, exact: false },
];

const PageRoutes = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const isLoading = useSelector((state) => state.users.isAuthorizedUserLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorizedUser());
  }, []);

  if (isLoading) {
    return (
      <div className="cnPageRoutesLoader">
        <Bars width={80} height={80} color="#BRFF" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser ? (
          authorizedRoutes.map((route) => <Route key={route.path} {...route} />)
        ) : (
          <Route path="/" element={<NoAccessPage />} exact />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
