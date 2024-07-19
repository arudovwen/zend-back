import axios from "axios";
import { toast } from "react-toastify";
import { getItem } from "@/utils/localStorageControl";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getItem("accessToken")}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "") {
    return client({
      method: "GET",
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    Authorization: `Bearer ${getItem("accessToken")}`,
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response) {
      if (response.status === 500) {
        toast.error(response.data.message);
      } else if (response.status === 401) {
        Notification.error({
          message: "Error",
          description: "Token expired",
        });

        localStorage.clear();
        window.location.href = `/auth/login?redirect_from=${window.location.href}`;
      } else {
        return Promise.reject(error);;
      }
    }
    return Promise.reject(error);
  }
);
export { DataService };
