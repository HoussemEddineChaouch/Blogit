import { useEffect, useState } from "react";
import blogTexture from "../../assets/images/cover.jpg";
import trophee from "../../assets/images/trophee-coupe-Icon.png";
import { Link, useLocation } from "react-router-dom";

function BoardHeader() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const isTopWriters =
    currentPath === "/blogs/leaderboard" ||
    currentPath === "/blogs/leaderboard/";
  const isTopBlogs = currentPath.includes("/blogs/leaderboard/top-blogs");

  return (
    <div
      className="relative rounded-2xl h-72 bg-fontBaseColor bg-cover bg-center bg-no-repeat font-Cairo"
      style={{ backgroundImage: `url(${blogTexture})` }}
    >
      <div
        className="absolute inset-0 rounded-2xl z-0
                   bg-gradient-to-r 
                   from-fontBaseColor
                   to-headerColor/40"
      ></div>
      <div className="relative z-10 h-full flex items-center justify-around ">
        <div className="flex flex-col gap-6">
          <Link
            to="/blogs/leaderboard"
            className={`border rounded-full px-8 py-3 transition-all duration-300 ${
              isTopWriters
                ? "bg-baseColor text-fontBaseColor border-transparent shadow-md"
                : "text-baseColor border-baseColor hover:bg-baseColor/20"
            }`}
          >
            Top Writers
          </Link>
          <Link
            to="/blogs/leaderboard/top-blogs"
            className={`border rounded-full px-8 py-3 transition-all duration-300 ${
              isTopBlogs
                ? "bg-baseColor text-fontBaseColor border-transparent shadow-md"
                : "text-baseColor border-baseColor hover:bg-baseColor/20"
            }`}
          >
            Top Blogs
          </Link>
        </div>
        <img src={trophee} alt="trophee" className="w-52 " />
        <p className="text-2xl font-semibold text-baseColor">
          Recognizing Top
          <span className="block text-yellowAlphaColor">Writers and</span>
          Influential Blogs
        </p>
      </div>
    </div>
  );
}

export default BoardHeader;
