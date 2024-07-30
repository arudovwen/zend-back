import { url } from "@/helpers/url_helpers";
import { DataService } from "@/services/api_service";
import {cleanObject} from "@/utils/cleanObject";

const { post, get } = DataService;
const zendBaseUrl = process.env.NEXT_PUBLIC_USD_ENDPOINT;

export const getAllZendTransactionMetrics = async (payload) => {
  return get(`${url.TRANSACTIONS}/metrics`, zendBaseUrl);
};

export const getAllZendTransactions = async (payload) => {
  return get(
    `${url.TRANSACTIONS}/find?${new URLSearchParams(cleanObject(payload))}`,
    zendBaseUrl
  );
};

export const updateRequest = async (payload) => {
  const { id, type } = payload;
  return post(`${url.TRANSACTIONS}/${id}/${type}`, payload, zendBaseUrl);
};
