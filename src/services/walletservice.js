import { url } from "@/helpers/url_helpers";
import { DataService } from "@/services/api_service";
import {cleanObject} from "@/utils/cleanObject";

const { post, get, patch } = DataService;

const walletBaseUrl = process.env.NEXT_PUBLIC_WALLET_ENDPOINT;
const personalWalletBaseUrl = process.env.NEXT_PUBLIC_PERSONAL_WALLET_ENDPOINT;
const quickSellBaseUrl = process.env.NEXT_PUBLIC_QUICK_SELL_ENDPOINT;
const transactionBaseUrl = process.env.NEXT_PUBLIC_TRANSACTION_ENDPOINT;

export const sendNotification = async (payload) => {
  return post(`${url.NOTIFICATION}/broadcast`, payload, personalWalletBaseUrl);
};

export const getWithdrawSettings = async (payload) => {
  return get(`${url.WALLET}/settings?feature=withdrawal`, personalWalletBaseUrl);
};

export const getWallets = async (payload) => {
  return get(
    `${url.WALLET}?${new URLSearchParams(cleanObject(payload))}`,
    personalWalletBaseUrl
  );
};

export const resolveTransaction = async (payload) => {
  const { type, ...rest } = payload;
  return patch(
    `${url.WALLET}/resolve-${type}?${new URLSearchParams(cleanObject(rest))}`,
    payload,
    personalWalletBaseUrl
  );
};

export const getSanctionList = async (payload) => {
  return get(
    `${url.WALLET}/sanctioned-user?${new URLSearchParams(
      cleanObject(payload)
    )}`,
    personalWalletBaseUrl
  );
};

export const getAllTransactions = async (payload) => {
  const { type, ...rest } = payload;
  return get(
    `${type}/history?${new URLSearchParams(cleanObject(rest))}`,
    personalWalletBaseUrl
  );
};

export const getAllStatement = async (payload) => {
  const { type, ...rest } = payload;
  return get(
    `${type}/soa?${new URLSearchParams(cleanObject(rest))}`,
    personalWalletBaseUrl
  );
};

export const getQuickSell = async (payload) => {
  return get(
    `${url.ORDERS}/find?${new URLSearchParams(cleanObject(payload))}`,
    quickSellBaseUrl
  );
};

export const getUserQuickSell = async (payload) => {
  return get(
    `${url.USERS}/${payload.id}/${url.ORDERS}/find?${new URLSearchParams(
      cleanObject(payload)
    )}`,
    quickSellBaseUrl
  );
};

export const getUserOrderQuickSell = async (payload) => {
  return get(`${url.ORDERS}/${payload}/find`, quickSellBaseUrl);
};

export const updateOrderStatus = async (payload) => {
  return post(
    `${url.ORDERS}/${payload.id}/${payload.status}`,
    payload,
    quickSellBaseUrl
  );
};

export const getQuickSellMetric = async (payload) => {
  return get(
    `${url.ORDERS}/metrics?${new URLSearchParams(cleanObject(payload))}`,
    quickSellBaseUrl
  );
};

export const getUserQuickSellMetric = async (payload) => {
  return get(
    `${url.USERS}/${payload.id}/orders/metrics`,

    quickSellBaseUrl
  );
};
export const updateWithdrawal = async (payload) => {
  return post(`/withdraw/${payload.type}`, payload, personalWalletBaseUrl);
};

export const enableWithdrawal = async (payload) => {
  return post(`/withdraw/enable`, payload, personalWalletBaseUrl);
};

export const getZendHistory = async (payload) => {
  return get(
    `zend-usd/find?${new URLSearchParams(cleanObject(payload))}`,
    transactionBaseUrl
  );
};

export const getUserAssetBalance = async (payload) => {
  const { type, ...rest } = payload;
  return get(
    `/balance/${type}?${new URLSearchParams(cleanObject(rest))}`,
    personalWalletBaseUrl
  );
};

export const getAllTransactionCount = async (payload) => {
  const { type, ...rest } = payload;
  return get(`zend-usd/count/all`, transactionBaseUrl);
};

export const setRate = async (payload) => {
  const { type, ...rest } = payload;
  return get(
    `zend-usd/rates/set?${new URLSearchParams(cleanObject(payload))}`,
    transactionBaseUrl
  );
};

export const getRate = async (payload) => {
  return get(
    `/zend-usd/rates/find/one?${new URLSearchParams(cleanObject(payload))}`,
    transactionBaseUrl
  );
};

export const getDashboardMetrics = async (payload) => {
  return get(
    `/transaction/metrics?${new URLSearchParams(cleanObject(payload))}`,
    personalWalletBaseUrl
  );
};

export const getAllMessages = async (payload) => {
  return get(
    `chats/${payload?.id}/messages/find?${new URLSearchParams(
      cleanObject(payload)
    )}`,
    quickSellBaseUrl
  );
};

export const sendMessage = async (payload) => {
  return get(`chats/${payload?.id}/messages/create`, payload, quickSellBaseUrl);
};

export const listenMessage = async (payload) => {
  return get(`chats/${payload?.id}/messages/listen`, quickSellBaseUrl);
};
