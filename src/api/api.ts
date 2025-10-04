import type { LoginRequest, RegisterRequest } from "../types/requests";
import type {
  LoginResponse,
  RegisterResponse,
  UserResponse,
} from "../types/responses";
import { api } from "./axiosConfig";

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", data);
  return res.data;
};

export const getUserInfo = async (): Promise<UserResponse> => {
  const res = await api.get<UserResponse>("/auth/me");
  return res.data;
};
