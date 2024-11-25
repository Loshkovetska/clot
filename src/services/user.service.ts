import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { UpdateUserParams } from "@/lib/utils/user";

class UserServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async updateUser(params: UpdateUserParams): Promise<any> {
    const response = await this.routeClient.put("user", params);

    return response.data;
  }
}

const UserService = new UserServiceClass();

export default UserService;
