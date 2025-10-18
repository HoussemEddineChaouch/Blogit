import React from "react";
import { useFormik } from "formik";

const listInput = [
  {
    id: 1,
    name: "newPassword",
    placeholder: "New password",
    type: "password",
  },
  {
    id: 2,
    name: "confirmPassword",
    placeholder: "Confirm password",
    type: "password",
  },
];

function ResetPassword({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 text-center text-fontBaseColor"
    >
      <div className="w-10 h-10 mx-auto bg-fontBaseColor rounded-lg"></div>
      <h1 className="font-bold">Reset Password</h1>
      <p>
        Welcome to our password reset portal. Kindly enter your email below to
        begin resetting your password.
      </p>
      {listInput.map(({ id, name, placeholder, type }) => {
        return (
          <div key={id} className="w-full">
            <input
              className="input w-full"
              name={name}
              placeholder={placeholder}
              type={type}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors[name]}
              </div>
            )}
          </div>
        );
      })}
      <button type="submit" className="btn-auth bg-secondaryColor w-full">
        {isLoading ? "Loading..." : "Reset"}
      </button>
    </form>
  );
}

export default ResetPassword;
