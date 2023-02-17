import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageRoutes from "./components/PageRoutes";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  );
};

export default App;
