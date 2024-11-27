import dayjs from "dayjs";

export const generateReviewDate = (dt: string) => {
  const today = new Date();

  const date = new Date(dt);

  const days = Math.floor((today.getTime() - date.getTime()) / 86400000);

  if (days > 31) {
    return dayjs(date).format("DD MMMM YY");
  }

  if (days === 1) {
    return "A day ago";
  }

  if (!days) return "Today";

  return `${days}days ago`;
};
