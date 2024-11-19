import HomeIcon from "@/components/icons/home";
import NotificationIcon from "@/components/icons/notifications";
import OrdersIcon from "@/components/icons/orders";
import ProfileIcon from "@/components/icons/profile";
import { ROUTES } from "@/lib/constants/routes";

export const NAVBAR_ITEMS = [
  {
    id: 1,
    icon: <HomeIcon />,
    path: ROUTES.home,
  },
  {
    id: 2,
    icon: <NotificationIcon />,
    path: ROUTES.notifications,
  },
  {
    id: 3,
    icon: <OrdersIcon />,
    path: ROUTES.orders,
  },
  {
    id: 4,
    icon: <ProfileIcon />,
    path: ROUTES.profile,
  },
];
