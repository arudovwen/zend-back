/* eslint-disable import/prefer-default-export */
import moment from "moment";

export function formatTimestamp(timestamp) {
  const now = moment();
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  if (moment(timestamp).isSame(now, "day")) {
    return "Today";
  }
  if (moment(timestamp).isSame(yesterday, "day")) {
    return "Yesterday";
  }
  if (now.diff(timestamp, "hours") <= 5) {
    const hoursAgo = now.diff(timestamp, "hours");
    if (hoursAgo === 0) {
      return "Now";
    }
    if (hoursAgo === 1) {
      return `${hoursAgo} hour ago`;
    }
    return `${hoursAgo} hours ago`;
  }
  if (now.diff(timestamp, "minutes") < 60) {
    const minutesAgo = now.diff(timestamp, "minutes");
    if (minutesAgo <= 1) {
      return "Now";
    }
    return `${minutesAgo} minutes ago`;
  }
  return moment(timestamp).format("MMM D, YYYY");
}
