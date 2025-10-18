// utils/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";

const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoadingAuth } = useSelector((state) => state.auth);

  if (isLoadingAuth) return <Spinner />;

  if (!isAuth) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
