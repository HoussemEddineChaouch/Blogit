import { Link } from "react-router-dom";
import { useFormik } from "formik";
import NavButtons from "../NavButtons";
import { AiFillGoogleCircle } from "react-icons/ai";

const inputList = [
  { id: 1, name: "email", placeholder: "Email", type: "email" },
  { id: 2, name: "password", placeholder: "Password", type: "password" },
];

function Signin({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  authLogin,
}) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <NavButtons />
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

        <Link
          to="forget-password"
          className="self-end text-sm text-blue-600 hover:underline"
        >
          Forget Password?
        </Link>

        <button
          type="submit"
          className="bg-secondaryColor p-4 rounded-md hover:bg-fontBaseColor hover:text-baseColor transition-all"
        >
          {isLoading ? "Loading..." : "Sign in"}
        </button>
        <hr />
      </form>
      <button
        onClick={() => authLogin()}
        className="w-full bg-secondaryColor flex items-center justify-center gap-4 p-4 rounded-md hover:bg-fontBaseColor hover:text-baseColor transition-all"
      >
        <AiFillGoogleCircle className="text-20" /> Sign in with google
      </button>
    </>
  );
}

export default Signin;
