import React from "react";
import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="container mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
