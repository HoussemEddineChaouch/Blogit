import blogTexture from "../../assets/images/cover.jpg";
import CardProfile from "../../components/shared/CardProfile";
import rocketImage from "../../assets/images/rocketPng.png";
import starImage from "../../assets/images/starPng.png";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import Spinner from "../../components/shared/Spinner";

function UpdateProfile({
  initialValues,
  validationSchema,
  isLoading,
  onSubmit,
  onDelete,
  stat,
}) {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("newPassword", values.newPassword);
      formData.append("countryCode", values.countryCode);
      formData.append("avatarUrl", values.avatarUrl);

      onSubmit(formData);
    },
  });

  const defaultAvatar =
    "https://static.wikia.nocookie.net/jamescameronsavatar/images/d/dd/Human_Sully.png/revision/latest/scale-to-width/360?cb=202105280338060";

  const [preview, setPreview] = useState(
    initialValues.avatarUrl
      ? `http://localhost:5000/images/${initialValues.avatarUrl}`
      : defaultAvatar
  );

  useEffect(() => {
    setPreview(
      initialValues.avatarUrl
        ? `http://localhost:5000/images/${initialValues.avatarUrl}`
        : defaultAvatar
    );
  }, [initialValues.avatarUrl]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue("avatarUrl", file);
    }
  };

  const handleResetImage = () => {
    setPreview(defaultAvatar);
    formik.setFieldValue("avatarUrl", defaultAvatar);
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative font-Cairo border rounded-2xl p-8 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${blogTexture})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-r from-fontBaseColor to-headerColor/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full text-baseColor">
        <h1 className="text-xl font-bold">Account Settings</h1>
        <p className="text-sm font-light opacity-70">
          Welcome again to your account settings
        </p>

        <div className="h-full flex gap-4 mt-4">
          {/* LEFT SIDE */}
          <div className="w-1/2 space-y-3">
            {/* Avatar + Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <div className="relative w-28 h-28 flex-shrink-0">
                <img
                  src={preview}
                  alt="avatar"
                  className="w-28 h-28 object-cover rounded-2xl border-2 border-baseColor cursor-pointer"
                  onClick={() => document.getElementById("avatarInput").click()}
                />
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="w-[200px] px-4 py-3 bg-fontBaseColor text-baseColor rounded-2xl"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={handleResetImage}
                  className="px-4 py-3 border border-baseColor rounded-2xl"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <input
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg px-3 py-3 w-full text-baseColor bg-transparent focus:outline-none ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2">
              <div
                className={`border rounded-lg px-3 py-2 bg-transparent text-baseColor ${
                  formik.touched.countryCode && formik.errors.countryCode
                    ? "border-red-500"
                    : ""
                }`}
              >
                <ReactFlagsSelect
                  searchable
                  selected={formik.values.countryCode}
                  onSelect={(code) => formik.setFieldValue("countryCode", code)}
                  className="text-baseColor "
                  placeholder="Select your country"
                />
              </div>
              {formik.touched.countryCode && formik.errors.countryCode && (
                <p className="text-red-500 text-sm">
                  {formik.errors.countryCode}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg px-3 py-3 text-baseColor bg-transparent focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <input
                name="newPassword"
                placeholder="New password"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg px-3 py-3 text-baseColor bg-transparent focus:outline-none ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={onDelete}
                className="w-1/2 px-4 py-3 text-baseColor border border-baseColor rounded-lg"
              >
                Delete account
              </button>
              <button
                type="submit"
                className="w-1/2 px-4 py-3 bg-fontBaseColor text-baseColor rounded-lg"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2 flex flex-col gap-4">
            <CardProfile
              type="Topwriter"
              title="Rank"
              iconUrl={starImage}
              rank={stat.rank}
            />
            <CardProfile
              type="TopBlogs"
              title="Reach"
              iconUrl={rocketImage}
              rank={stat.reach}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateProfile;
