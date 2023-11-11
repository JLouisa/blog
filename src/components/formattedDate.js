import { DateTime } from "luxon";

const formattedDate = (date) => {
  const dateObject = new Date(date);
  return DateTime.fromJSDate(dateObject).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default formattedDate;
