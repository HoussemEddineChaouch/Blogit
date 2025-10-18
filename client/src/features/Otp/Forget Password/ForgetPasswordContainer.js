import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./ForgetPassword";
import { initialValues, validationSchema } from "./ForgetPasswordFormik";
import { clearMessages } from "../../../redux/slices/Auth/AuthSlice";
import { showToast } from "../../../utils/toastHandler";
import { useEffect } from "react";
import { sendOpt } from "../../../redux/slices/Auth/AuthThunks";
import { useNavigate } from "react-router-dom";

function ForgetPasswordContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(sendOpt(values))
      .unwrap()
      .then(() => {
        navigate("/auth/verify-otp");
      });
  };

  return (
    <ForgetPassword
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default ForgetPasswordContainer;
