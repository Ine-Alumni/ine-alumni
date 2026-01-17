import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is not valid.")
    .required("Email address is required."),
  token: yup.string().required("Verification code is required."),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;"'<>,.?]).{8,25}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .required("New password is required."),
});
