import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current active tab based on pathname
  const currentPath = location.pathname.includes("signup")
    ? "signup"
    : location.pathname.includes("/auth")
    ? "/auth"
    : "";

  return (
    <div className="flex gap-3 bg-secondaryColor p-2 rounded-lg mb-10">
      <button
        onClick={() => navigate("/auth")}
        className={
          currentPath === "/auth"
            ? "w-1/2 btn-auth"
            : "w-1/2 bg-transparent text-fontBaseColor"
        }
      >
        Sign in
      </button>

      <button
        onClick={() => navigate("/auth/signup")}
        className={
          currentPath === "signup"
            ? "w-1/2 btn-auth"
            : "w-1/2 bg-transparent text-fontBaseColor"
        }
      >
        Sign up
      </button>
    </div>
  );
}

export default NavButtons;
