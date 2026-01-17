import * as yup from 'yup';

export const signinSchema = yup.object().shape({
    email: yup.string().email("Email address is not valid.").required("Email address is required."),
    password: yup.string().min(8, "Password must be at least 8 characters long.").required("Password is required."),
})
