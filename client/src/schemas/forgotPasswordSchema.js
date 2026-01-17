import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is not valid.")
    .required("Email address is required."),
});
