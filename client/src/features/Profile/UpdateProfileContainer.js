import { useEffect, useMemo } from "react";
import UpdateProfile from "./UpdateProfile";
import { formValidationSchema } from "./UpdateProfileFormik";
import {
  deleteAccount,
  me,
  updateProfile,
} from "../../redux/slices/User/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastHandler";
import { clearMessages } from "../../redux/slices/User/userSlice";

function UpdateProfileContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoading,
    user: { userDetails, totalReach, Rank },
    successMsg,
    errorMsg,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  const initialValues = useMemo(() => {
    if (!userDetails) {
      return {
        username: "",
        countryCode: "",
        email: "",
        newPassword: "",
        avatarUrl: null,
      };
    }

    return {
      username: userDetails.username || "",
      countryCode: userDetails.countryCode || "",
      email: userDetails.email || "",
      newPassword: "",
      avatarUrl: userDetails.avatarUrl || null,
    };
  }, [userDetails]);

  const handleSubmit = (formData) => {
    dispatch(updateProfile(formData));
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (successMsg) {
      showToast("success", successMsg);
    }
    if (errorMsg) showToast("error", errorMsg);
    dispatch(clearMessages());
  }, [successMsg, errorMsg, dispatch, navigate]);

  useEffect(() => {
    navigate("/auth");
  }, [successMsg, navigate]);

  return (
    <UpdateProfile
      initialValues={initialValues}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmit}
      onDelete={handleDeleteAccount}
      isLoading={isLoading}
      stat={{
        rank: Rank || 0,
        reach: totalReach || 0,
      }}
    />
  );
}

export default UpdateProfileContainer;
