import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Provide a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const CreateAdminSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
