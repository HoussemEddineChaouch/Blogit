import { useFormik } from "formik";
import React from "react";

function ForgetPassword({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
}) {
  const formik = useFormik({
    initialValues,
    validationSchema,
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
      <h1 className="font-bold">Forget Password</h1>
      <p>
        lcome to our password reset tool. Please provide your email in the form
        below to start the process.
      </p>
      <input
        name="email"
        type="email"
        className="input block w-full"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
      )}
      <button type="submit" className="btn-auth bg-secondaryColor w-full">
        {isLoading ? "loading..." : "Send OTP"}
      </button>
    </form>
  );
}

export default ForgetPassword;
