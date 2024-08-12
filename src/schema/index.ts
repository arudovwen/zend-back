import * as yup from "yup";

export const RateSchema = yup.object().shape({
  zendrate: yup.mixed().nullable(),
  quicksell:yup.mixed().nullable(),
});
export const LoginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Provide a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const VerifyLoginSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6, "OTP must be 6 characters")
    .required("OTP is required"),
});

export const CreateAdminSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const KinSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  relationship: yup.string().required("Relationship is required"),
  emailAddress: yup.string().email().required("Email is required"),
});
export const PersonalSchema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string(),
  homeAddress: yup.string(),
  dateOfBirth: yup.string(),
  gender: yup.string(),
});

export const AdminSchema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string(),
  gender: yup.string(),
  role: yup.string(),
  image:yup.string()
});

export const LockSchema = yup.object().shape({
  reason: yup.string().required("Reason is required"),
  id: yup.string().required(),
});
export const VerificationSchema = yup.object().shape({
  type: yup.string(),
  reason: yup.string(),
  id: yup.string().required(),
});
export const BroadcastSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  subject: yup.string().required("Subject is required"),
  body: yup.string().required("Message is required"),
  banner: yup.string(),
  notifyType: yup.string().required("Type is required"),
});
