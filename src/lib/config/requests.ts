import axios from "axios";

export const ROUTE_CLIENT = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
});
