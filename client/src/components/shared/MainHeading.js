import React from "react";

function MainHeading({
  title = "Empty heading",
  subtitle = "Empty subtitle for now:",
}) {
  return (
    <div className="relative my-8 pl-6 text-fontBaseColor font-Cairo">
      <span className="absolute left-0 top-0 w-1 h-full bg-fontBaseColor rounded-full"></span>
      <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
      <h2 className="opacity-60 text-sm sm:text-base mt-1">{subtitle}</h2>
    </div>
  );
}

export default MainHeading;
