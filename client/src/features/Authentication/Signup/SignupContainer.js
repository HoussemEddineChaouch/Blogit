import React, { useEffect } from "react";
import Signup from "./Signup";
import { initialValues, validationSchema } from "./SignupFormik";
import { clearMessages } from "../../../redux/slices/Auth/AuthSlice";
import { showToast } from "../../../utils/toastHandler";
import { signUpUser } from "../../../redux/slices/Auth/AuthThunks";
import { useDispatch, useSelector } from "react-redux";
function SignupContainer() {
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
    dispatch(signUpUser(values));
  };
  return (
    <div>
      <Signup
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default SignupContainer;
