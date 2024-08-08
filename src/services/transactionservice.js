import { url } from "@/helpers/url_helpers";
import { DataService } from "@/services/api_service";
import {cleanObject} from "@/utils/cleanObject";

const { post, get } = DataService;

const transactionBaseUrl = process.env.NEXT_PUBLIC_PERSONAL_WALLET_ENDPOINT;

export const sendNotification = async (payload) => {
  return post(`${url.NOTIFICATION}/broadcast`, payload, transactionBaseUrl);
};

export const getWithdrawSettings = async (payload) => {
  return get(`${url.WALLET}/settings?feature=withdrawal`, transactionBaseUrl);
};

export const getWallets = async (payload) => {
  return get(
    `${url.WALLET}?${new URLSearchParams(cleanObject(payload))}`,
    transactionBaseUrl
  );
};

export const getAllTransaction = async (payload) => {
  return get(
    `${url.TRANSACTION}/history?${new URLSearchParams(cleanObject(payload))}`,
    transactionBaseUrl
  );
};
