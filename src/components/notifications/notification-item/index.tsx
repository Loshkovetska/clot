import { NotificationIcon } from "@/components/icons";
import { NotificationType } from "@/types/notification";

export default function NotificationItem({ text }: NotificationType) {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg bg-light-100 px-3 py-4">
      <div className="relative flex items-center justify-center">
        <NotificationIcon />
        <div className="absolute -right-1 -top-1 size-2 rounded-full bg-destructive" />
      </div>
      <p className="line-clamp-2 text-sm">{text}</p>
    </div>
  );
}
