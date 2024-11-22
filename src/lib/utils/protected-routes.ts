import { ROUTES } from "@/lib/constants/routes";

export const getProtectedRoutes = () => {
  return Object.entries(ROUTES)
    .filter(
      ([key]) => key !== "signIn" && key !== "signUp" && key !== "resetPassword"
    )
    .map(([key, value]) => {
      if (key === "products" || key === "categories") {
        return `${value}(.*)`;
      }

      return value;
    });
};
