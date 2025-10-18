import * as Yup from "yup";

export const formInitialValues = {
  username: "",
  countryCode: "",
  email: "",
  newPassword: "",
  avatarUrl: null,
};

export const formValidationSchema = Yup.object({
  username: Yup.string().trim().min(2).max(30).required(),
  countryCode: Yup.string().required(),
  email: Yup.string().trim().email("Invalid email").required(),
  newPassword: Yup.string().trim().min(6).max(50),
});
