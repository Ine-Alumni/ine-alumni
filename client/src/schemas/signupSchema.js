import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required."),
    email: yup.string().email("Email address is not valid.").required("Email address is required."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(25, "Password must not exceed 25 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;"'<>,.?]).{8,25}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords do not match.")
      .required("Password confirmation is required."),
    major: yup.string().required("Major is required."),
    graduationYear: yup
      .number()
      .min(1961, "Graduation year must be greater than or equal to 1961.")
      .max(2200, "Graduation year must be less than or equal to 2200.")
      .required("Graduation year is required."),
    phoneNumber: yup.string().min(7, "Invalid phone number.").max(15, "Invalid phone number."),
    gender: yup.string().required("Gender is required."),
    country: yup.string(),
    city: yup.string(),
})
