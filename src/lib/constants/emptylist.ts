import NotificationImage from "@/images/empty-list/bell.png";
import OrdersImage from "@/images/empty-list/check-out.png";
import MessageImage from "@/images/empty-list/image4.png";
import CartImage from "@/images/empty-list/parcel1.png";
import SearchImage from "@/images/empty-list/search1.png";
import { ROUTES } from "@/lib/constants/routes";

export const EMPTYLIST_DATA = {
  notifications: {
    title: "No Notification yet",
    imageUrl: NotificationImage,
    buttonTitle: "Explore Categories",
    buttonLink: ROUTES.categories,
  },
  orders: {
    title: "No Orders yet",
    imageUrl: OrdersImage,
    buttonTitle: "Explore Categories",
    buttonLink: ROUTES.categories,
  },
  cart: {
    title: "Your Cart is Empty",
    imageUrl: CartImage,
    buttonTitle: "Explore Categories",
    buttonLink: ROUTES.categories,
  },
  message: {
    title: "We Sent you an Email to reset your password.",
    imageUrl: MessageImage,
    buttonTitle: "Return to Login",
    buttonLink: ROUTES.signIn,
  },
  search: {
    title: "Sorry, we couldn't find any matching result for your Search.",
    imageUrl: SearchImage,
    buttonTitle: "Return to Home",
    buttonLink: ROUTES.home,
  },
  wishlist: {
    title: "Your Wishlist is Empty",
    imageUrl: SearchImage,
    buttonTitle: "Explore Categories",
    buttonLink: ROUTES.categories,
  },
  address: {
    title: "No addresses were found",
    imageUrl: SearchImage,
    buttonTitle: "Add New Address",
    buttonLink: "",
  },
  card: {
    title: "No cards were found",
    imageUrl: SearchImage,
    buttonTitle: "Add New Card",
    buttonLink: "",
  },
};
