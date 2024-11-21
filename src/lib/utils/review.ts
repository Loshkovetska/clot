import dayjs from "dayjs";

export const generateReviewDate = (date: Date) => {
  const today = new Date();

  const days = (today.getTime() - date.getTime()) / 86400000;

  if (days > 31) {
    return dayjs(date).format("DD MMMM YY");
  }

  if (days === 1) {
    return "A day ago";
  }

  return `${days}days ago`;
};
