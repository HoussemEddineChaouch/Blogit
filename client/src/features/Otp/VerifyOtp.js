import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../redux/slices/Auth/AuthThunks";
import { showToast } from "../../utils/toastHandler";
import { clearMessages } from "../../redux/slices/Auth/AuthSlice";
import { GoUnverified } from "react-icons/go";

const inputStyle = {
  width: "4rem",
  height: "4rem",
  margin: "0 0.5rem",
  fontSize: "1.5rem",
  borderRadius: "0.8rem",
  border: "1px solid #0E2954",
  textAlign: "center",
  backgroundColor: "transparent",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "1rem 0",
};

function VerifyOtp() {
  const [plainOtp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMsg, errorMsg, isLoading, otpLink } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMsg && otpLink) {
      navigate("/auth/reset-password?token=" + otpLink);
    }
    if (successMsg) {
      showToast("success", successMsg);
      dispatch(clearMessages());
    }
    if (errorMsg) {
      showToast("error", errorMsg);
      dispatch(clearMessages());
    }
  }, [successMsg, errorMsg, otpLink, dispatch, navigate]);

  const handelSubmit = () => {
    dispatch(verifyOtp({ plainOtp }));
  };

  return (
    <div className="space-y-4 text-center text-fontBaseColor">
      <div className="w-10 h-10 mx-auto text-[20px] text-baseColor flex items-center justify-center bg-fontBaseColor rounded-lg">
        <GoUnverified />
      </div>
      <h1 className="font-bold">OTP Verification</h1>
      <p>
        Welcome to our OTP verification. Please enter your email in the form
        below to initiate the process
      </p>
      <OtpInput
        value={plainOtp}
        onChange={setOtp}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        numInputs={4}
        renderInput={(props) => <input {...props} />}
      />
      <button
        onClick={handelSubmit}
        className="btn-auth bg-secondaryColor w-full"
      >
        {isLoading ? "Loading..." : " Send OTP"}
      </button>
    </div>
  );
}

export default VerifyOtp;
