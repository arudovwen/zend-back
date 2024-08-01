import { url } from "@/helpers/url_helpers";
import { DataService } from "@/services/api_service";
import { cleanObject } from "@/utils/cleanObject";
const { post, get, del } = DataService;

export const banUser = async (id) => {
  return post(`${url.USERS}/${id}/ban`, payload);
};

export const unlockUser = async (id) => {
  return post(`${url.USERS}/${id}/unlock`, payload);
};
export const unbanUser = async (id) => {
  return post(`${url.USERS}/${id}/unban`, payload);
};

export const getActivityOptions = async () => {
  return get(`${url.GET_ACTIVITY_OPTIONS}`);
};

export const getCurrentAdmin = async (id) => {
  return get(`${url.ADMIN}/${id}/find`);
};

export const getUserSessions = async (id) => {
  return get(`${url.USERS}/${id}/sessions/find`);
};

export const getSessions = async (id) => {
  return get(`${url.ADMIN}/${id}/sessions/find`);
};

export const getNotifications = async (id) => {
  return get(`${url.ADMIN}/${id}/notifications/find`);
};

export const updateProfile = async (payload) => {
  return post(
    `${url.ADMIN}/${payload.id}/update?operation=profile_update`,
    payload
  );
};

export const getAllAdmin = async (payload) => {
  return post(
    `${url.ADMIN}/find?${new URLSearchParams(cleanObject(payload))}`,cleanObject(payload)
  );
};

export const banAdmin = async (payload) => {
  return post(`${url.ADMIN}/${payload}/ban`, payload);
};

export const unbanAdmin = async (payload) => {
  return post(`${url.ADMIN}/${payload}/unban`, payload);
};

export const createAdmin = async (payload) => {
  return post(`${url.ADMIN}/create`, payload);
};

export const deleteAdmin = async (payload) => {
  return del(`${url.ADMIN}/${payload}/delete`, payload);
};

export const getAdminsActivity = async (payload) => {
  return get(
    `${url.ADMIN}/activity-logs/find?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};
export const getAdminActivity = async (payload) => {
  return get(
    `${url.ADMIN}/${payload.id}/activity-logs/find?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getUsersActivity = async (payload) => {
  return get(
    `${url.USERS}/activity-logs/find?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getUserActivity = async (payload) => {
  return get(
    `${url.USERS}/${payload.id}/activity-logs/find?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getAdminAnalytics = async () => {
  return get(`${url.ADMIN}/metrics`);
};

export const getAllUsers = async (payload) => {
  return get(`${url.USERS}/find?${new URLSearchParams(cleanObject(payload))}`);
};

export const getAllUsersCount = async (payload) => {
  return get(`${url.USERS}/count-all?${new URLSearchParams(cleanObject(payload))}`);
};

export const getUserTransaction = async () => {
  return get(`${url.TRANSACTION}/history`);
};

export const getUserKyc = async (payload) => {
  return get(`${url.USERS}/kyc/data?${new URLSearchParams(cleanObject(payload))}`);
};

export const getUserKyb = async (payload) => {
  return get(
    `${url.USERS}/businesses/find-all?${new URLSearchParams(cleanObject(payload))}`
  );
};

export const modifyUserKyb = async (payload) => {
  return get(`${url.USERS}/businesses/update?${new URLSearchParams(cleanObject(payload))}`);
};

export const getUserMetrics = async (payload) => {
  return get(
    `${url.USERS}/metrics?${new URLSearchParams(cleanObject(payload))}`
  );
};

export const getSignUpMetrics = async (payload) => {
  return get(
    `${url.USERS}/sign-up/metrics?${new URLSearchParams(cleanObject(payload))}`
  );
};

export const getUserDetail = async (payload) => {
  return get(
    `${url.USERS}/organizations/find/one?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getBusinessDetail = async (payload) => {
  return get(
    `${url.USERS}/businesses/find-one?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getUserInfo = async (payload) => {
  return get(`${url.USERS}/${payload}/find`);
};

export const updateVerificationRequest = async (payload) => {
  const { action, ...rest } = payload;
  return post(`${url.USERS}/verifications/${action}`, rest);
};

export const handleBroadcast = async (payload) => {
  const { type, ...rest } = payload;
  return post(`broadcast?type=${type}`, payload);
};

export const searchUser = async (payload) => {
  return get(`${url.USERS}?${new URLSearchParams(payload)}`);
};

export const getUsersVerifications = async (payload) => {
  return get(`${url.USERS}/verifications/find?${new URLSearchParams(cleanObject(payload))}`);
};

export const getUsersVerificationMetrics = async () => {
  return get(`${url.USERS}/verifications/metrics`);
};

export const getUserVerifications = async (payload) => {
  return get(
    `${url.USERS}/${payload.id}/verifications/find?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getUserKycDetail = async (payload) => {
  return get(
    `${url.USERS}/kyc-data?${new URLSearchParams(
      cleanObject(payload)
    )}`
  );
};

export const getDashboardMetrics = async (payload) => {
  return get(
    `${url.TRANSACTION}/metrics?${new URLSearchParams(cleanObject(payload))}`
  );
};
