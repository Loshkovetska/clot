import HomeIcon from "@/components/icons/home";
import NotificationIcon from "@/components/icons/notifications";
import OrdersIcon from "@/components/icons/orders";
import ProfileIcon from "@/components/icons/profile";

export const NAVBAR_ITEMS = [
  {
    id: 1,
    icon: <HomeIcon />,
    path: "/",
  },
  {
    id: 2,
    icon: <NotificationIcon />,
    path: "/notifications",
  },
  {
    id: 3,
    icon: <OrdersIcon />,
    path: "/orders",
  },
  {
    id: 4,
    icon: <ProfileIcon />,
    path: "/profile",
  },
];
