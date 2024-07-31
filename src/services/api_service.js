import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const API_ENDPOINT = process.env.NEXT_PUBLIC_USER_ENDPOINT;
// Retrieve the token from cookies
const getToken = () => {
  return getCookie("token"); // This works client-side
};

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const createClient = (baseURL = process.env.NEXT_PUBLIC_USER_ENDPOINT) => {
  const token = getToken();

  return axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Include Bearer token if it exists
      "Content-Type": "application/json",
    },
  });
};

class DataService {
  static client = createClient();

  static get(path = "", baseURL) {
    const client = createClient(baseURL || API_ENDPOINT);
    return client({
      method: "GET",
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = "", data = {}, optionalHeader = {}, baseURL) {
    const client = createClient(baseURL || API_ENDPOINT);
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = "", data = {}, baseURL) {
    const client = createClient(baseURL || API_ENDPOINT);
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static del(path = "", data = {}, baseURL) {
    const client = createClient(baseURL || API_ENDPOINT);
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}, baseURL) {
    const client = createClient(baseURL || API_ENDPOINT);
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
DataService.client.interceptors.request.use((config) => {
  // do something before executing the request
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    Authorization: `Bearer ${getItem("accessToken")}`,
  };

  return requestConfig;
});

DataService.client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response) {
      if (response.status === 500) {
        toast.error(response.data.message);
      } else if (response.status === 401) {
        toast.error("Token expired");
        localStorage.clear();
        window.location.href = `/?redirect_from=${window.location.href}`;
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { DataService };
