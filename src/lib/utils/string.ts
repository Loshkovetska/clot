export const formatePhoneNumber = (str: string) => {
  return str.replace(/(\d{3})-(\d{3})-(\d{4})/, "$1-$2-$3");
};
