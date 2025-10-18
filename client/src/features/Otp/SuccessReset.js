import React from "react";
import { Link } from "react-router-dom";

function SuccessReset() {
  return (
    <div className="bg-layerBaseColor flex items-center justify-center min-h-screen font-Cairo bg-baseColor text-fontBaseColor">
      <div className="w-[95vw] h-[90vh] border border-fontBaseColor rounded-lg overflow-hidden flex justify-center items-center">
        <div className="flex flex-col gap-4 text-center">
          <div className="w-20 h-20 rounded-lg mx-auto bg-fontBaseColor"></div>
          <h1 className="font-bold">Password Changed !</h1>
          <p>Congratulations! Your password has been successfully changed.</p>
          <Link
            to="/auth"
            className="bg-fontBaseColor w-fit px-14 py-3 rounded-full text-baseColor mx-auto"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessReset;
