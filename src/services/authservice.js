import { url } from "@/helpers/url_helpers";
import { DataService } from "@/services/api_service";
import {cleanObject} from "@/utils/cleanObject";

const { post, get } = DataService;
export const loginAdmin = async (payload) => {
  return post(`${url.LOGIN}`, payload);
};

export const verifyOtp = async (payload) => {
  return post(`${url.VERIFY_OTP}?${new URLSearchParams(payload)}`, payload);
};

export const logOut = async () => {
  return get(`${url.LOGOUT}`);
};

export const refreshToken = async (id) => {
  return post(`${url.REFRESH_TOKEN}/${id}/access-token/refresh`, payload);
};

export const resendOtp = async (payload) => {
  return get(`${url.RESEND_OTP}?${new URLSearchParams(payload)}`);
};
