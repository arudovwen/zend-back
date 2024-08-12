/* eslint-disable import/prefer-default-export */
export function cleanObject(obj) {
  if (!obj) return;
  const cleaned = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
}
