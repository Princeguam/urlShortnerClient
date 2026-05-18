import { type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../auth/tokenStorage";
// ── Request interceptor: attach access token ──────────────────────────────
export const requestInterceptor = (
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};
