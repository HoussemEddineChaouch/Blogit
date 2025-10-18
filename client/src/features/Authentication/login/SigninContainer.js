import React, { useEffect } from "react";
import Signin from "./Signin";
import { initialValues, validationSchema } from "./SigninFormik";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../utils/toastHandler";
import { clearMessages } from "../../../redux/slices/Auth/AuthSlice";
import { signInUser } from "../../../redux/slices/Auth/AuthThunks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SigninContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMsg, errorMsg, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMsg) {
      showToast("success", successMsg);
      dispatch(clearMessages());
    }
    if (errorMsg) {
      showToast("error", errorMsg);
      dispatch(clearMessages());
    }
  }, [successMsg, errorMsg, dispatch]);

  const handleSubmit = (values) => {
    dispatch(signInUser(values));
  };

  useEffect(() => {
    if (successMsg) {
      navigate("/");
    }
  }, [successMsg, navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/blogit/apiv1/auth/google";
  };
  return (
    <div>
      <Signin
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        authLogin={handleLogin}
      />
    </div>
  );
}

export default SigninContainer;
