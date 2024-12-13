import axios from "axios";

const baseUrl =
  process.env.PUBLIC_NEXT_BASE_URL ||
  "https://library-management-sable.vercel.app/api";

export enum Endpoint {
  members = "member",
  books = "book",
  loans = "loan",
}

export const getEndpoint = (endpoint: Endpoint, id?: string) => {
  return `/${endpoint}/${id ? id : ""}`;
};

export default axios.create({
  baseURL: baseUrl,
});
