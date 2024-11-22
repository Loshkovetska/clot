export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  resetPassword: "/forgot-password",
  products: "/products",
  categories: "/categories",
  cart: "/cart",
  notifications: "/notifications",
  orders: "/orders",
  profile: "/profile",
  favs: "/profile/favorites",
  addresses: "/profile/addresses",
  cards: "/profile/cards",
  checkout: "/checkout",
};

export const PROFILE_MENU = [
  {
    title: "Address",
    href: ROUTES.addresses,
  },
  {
    title: "Wishlist",
    href: ROUTES.favs,
  },
  {
    title: "Payment",
    href: ROUTES.cards,
  },
];
