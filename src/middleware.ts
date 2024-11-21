import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { ROUTES } from "@/lib/constants/routes";

const PROTECTED_ROUTES = Object.entries(ROUTES)
  .filter(
    ([key]) => key !== "signIn" && key !== "signUp" && key !== "resetPassword"
  )
  .map(([key, value]) => {
    if (key === "products" || key === "categories") {
      return `${value}(.*)`;
    }

    return value;
  });

const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTES);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
