import { api } from "./client";
import type { AuthTokens } from "../types";

// POST /api/auth/register
export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthTokens> => {
  const res = await api.post<AuthTokens>("/api/auth/register", data);
  return res.data;
};

// POST /api/auth/login
export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<AuthTokens> => {
  const res = await api.post<AuthTokens>("/api/auth/login", data);
  return res.data;
};

// POST /api/auth/logout
export const logoutApi = async (refreshToken: string): Promise<void> => {
  await api.post("api/auth/logout", { refreshToken });
};
