import React from "react";

function HeaderAuth({ title, subTitle }) {
  return (
    <div className="font-bold">
      <h1 className="text-40">{title}</h1>
      <h1 className="text-20">{subTitle}</h1>
    </div>
  );
}

export default HeaderAuth;
