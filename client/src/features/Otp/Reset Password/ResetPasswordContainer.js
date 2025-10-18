import React from "react";
import ResetPassword from "./ResetPassword";
import { initialValues, validationSchema } from "./ResetPasswordFormik";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/slices/Auth/AuthThunks";
import { useEffect } from "react";
import { showToast } from "../../../utils/toastHandler";
import { clearMessages } from "../../../redux/slices/Auth/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPasswordContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { isLoading, successMsg, errorMsg } = useSelector(
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
    console.log(values);
    dispatch(resetPassword({ token, ...values }))
      .unwrap()
      .then(() => {
        navigate("/auth/password-changed");
      })
      .catch((error) => {
        showToast("error", error);
        dispatch(clearMessages());
      });
  };
  return (
    <div>
      <ResetPassword
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ResetPasswordContainer;
