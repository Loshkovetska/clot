import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { WishlistParams } from "@/types/fav";
import { NotificationType } from "@/types/notification";

class NotificationServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async readNotification(params: WishlistParams): Promise<string> {
    let response;
    if (params.type === "add") {
      response = await this.routeClient.post("favorites", params);
    }

    if (params.type === "remove") {
      response = await this.routeClient.delete("favorites", {
        data: params,
      });
    }

    return response?.data;
  }

  async getNotifications(): Promise<NotificationType[]> {
    const response = await this.routeClient.get("notifications");

    return response.data;
  }

  async postNotification(): Promise<string> {
    const response = await this.routeClient.post("notifications");

    return response.data;
  }
}

const NotificationService = new NotificationServiceClass();

export default NotificationService;
