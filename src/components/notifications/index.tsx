"use client";

import { useQuery } from "@tanstack/react-query";

import EmptyList from "@/components/common/empty-list";
import NotificationItem from "@/components/notifications/notification-item";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import NotificationService from "@/services/notification.service";

export default function NotificationsContent() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: () => NotificationService.getNotifications(),
  });

  if (!data?.length && !isLoading) return <EmptyList type="notifications" />;

  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      {data?.map((item) => (
        <NotificationItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
}
