// utils/PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";

const PublicRoute = ({ children }) => {
  const { isAuth, isLoadingAuth } = useSelector((state) => state.auth);

  if (isLoadingAuth) return <Spinner />;

  if (isAuth) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
