import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../../components/shared/HeaderAuth";
import logo from "../../assets/logoBlogit.png";

function Authpage() {
  return (
    <div className="bg-layerBaseColor flex items-center justify-center min-h-screen font-Cairo bg-baseColor">
      <div className="w-[95vw] h-[90vh] border border-fontBaseColor rounded-lg overflow-hidden flex">
        {/* ---------- Left Side ---------- */}
        <div className="bg-secondaryColor w-1/2 h-full p-12 text-fontBaseColor flex flex-col justify-between">
          <HeaderAuth
            title="Blogit"
            subTitle="Explore and enjoy our latest blogs"
          />
          <img src={logo} alt="Blogit logo" className="w-64 mx-auto" />
          <p className="text-sm leading-relaxed text-center">
            Hello there! We're glad to see you again. Please log in to access
            our diverse collection of insightful blogs and stay updated with our
            latest content.
          </p>
        </div>

        {/* ---------- Right Side ---------- */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center px-8">
          <div className="w-[80%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authpage;
