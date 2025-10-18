import React from "react";
import { useFormik } from "formik";
import NavButtons from "../NavButtons";
import { AiFillGoogleCircle } from "react-icons/ai";
const inputList = [
  { id: 1, name: "username", placeholder: "Username", type: "text" },
  { id: 2, name: "email", placeholder: "Email", type: "email" },
  { id: 3, name: "password", placeholder: "Password", type: "password" },
];

function Signup({ initialValues, validationSchema, onSubmit, isLoading }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <NavButtons />{" "}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-6"
      >
        {inputList.map(({ id, name, placeholder, type }) => (
          <div key={id} className="flex flex-col">
            <input
              name={name}
              placeholder={placeholder}
              type={type}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors[name]}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-secondaryColor p-4 rounded-md hover:bg-fontBaseColor hover:text-baseColor transition-all"
        >
          {isLoading ? "loading..." : "Signup"}
        </button>
        <hr />
        <button
          type="submit"
          className="bg-secondaryColor flex items-center justify-center gap-4 p-4 rounded-md hover:bg-fontBaseColor hover:text-baseColor transition-all"
        >
          <AiFillGoogleCircle className="text-20" /> Sign up with google
        </button>
      </form>
    </>
  );
}

export default Signup;
