import request from "@/utils/request";
import type { ApiTokenInfo, CreatedApiToken } from "@/types/user";

export const userApi = {
  login: (data: { username: string; password: string }) => {
    return request.post<{ token: string }>("/api/user/login", data);
  },
  register: (data: { username: string; password: string; registerCode: string }) => {
    return request.post<{ token: string }>("/api/user/register", data);
  },
  getSponsors: () => {
    return request.get("/api/sponsors?timestamp=" + Date.now());
  },
  listApiTokens: () => request.get<ApiTokenInfo[]>("/api/user/api-tokens"),
  createApiToken: (data: { name: string; expiresInDays: number | null }) =>
    request.post<CreatedApiToken>("/api/user/api-tokens", data),
  revokeApiToken: (tokenId: string) => request.delete(`/api/user/api-tokens/${tokenId}`),
};
