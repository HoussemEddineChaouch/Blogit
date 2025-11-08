import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authpage from "./features/Authentication/Authpage";

import Profilepage from "./features/Profile/Profilepage";
import UpdateProfileContainer from "./features/Profile/UpdateProfileContainer";
import LeaderboardLayout from "./layout/LeaderboardLayout";
import TopWritersContainer from "./features/Learboard/TopWritersContainer";
import TopBlogsConatiner from "./features/Learboard/TopBlogsConatiner";
import Home from "./features/Home";

// Authentification import routes
import SigninContainer from "./features/Authentication/login/SigninContainer";
import SignupContainer from "./features/Authentication/Signup/SignupContainer";
import ResetPasswordContainer from "./features/Otp/Reset Password/ResetPasswordContainer";
import ForgetPasswordContainer from "./features/Otp/Forget Password/ForgetPasswordContainer";
import VerifyOtp from "./features/Otp/VerifyOtp";
import SuccessReset from "./features/Otp/SuccessReset";

import { ToastContainer } from "react-toastify";
import MainLayout from "./layout/MainLayout";
import UpdateBlogContainer from "./features/Blog/UpdateBlogContainer";
import { useDispatch, useSelector } from "react-redux";
import { verifyMe } from "./redux/slices/Auth/AuthThunks";
import ProtectedRoute from "./utils/ProtectedRoute";
import Spinner from "./components/shared/Spinner";
import PublicRoute from "./utils/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyMe());
  }, [dispatch]);

  if (isLoadingAuth) return <Spinner />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Authpage />
              </PublicRoute>
            }
          >
            <Route index element={<SigninContainer />} />
            <Route path="signup" element={<SignupContainer />} />
            <Route
              path="forget-password"
              element={<ForgetPasswordContainer />}
            />
            <Route path="verify-otp" element={<VerifyOtp />} />
            <Route path="reset-password" element={<ResetPasswordContainer />} />
          </Route>

          <Route
            path="/auth/password-changed"
            element={
              <PublicRoute>
                <SuccessReset />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profilepage />} />
            <Route path="settings" element={<UpdateProfileContainer />} />
            <Route path="home" element={<Home />} />
            <Route path="update-blog/:id" element={<UpdateBlogContainer />} />
            <Route path="blogs/leaderboard" element={<LeaderboardLayout />}>
              <Route index element={<TopWritersContainer />} />
              <Route path="top-blogs" element={<TopBlogsConatiner />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
