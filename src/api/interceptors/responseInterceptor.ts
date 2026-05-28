import api from "../axios";
import { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { failedQueue, processQueue } from "../auth/authQueue";
import { refreshAuth } from "../auth/refreshAuth";
import { clearAuth } from "../auth/clearAuth";

export interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
let isRefreshing = false;

export const responseInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err: unknown) => Promise.reject(err));
        }

        originalRequest._retry = true;

        isRefreshing = true;
        try {
            const newAccessToken = await refreshAuth();
            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError: unknown) {
            processQueue(refreshError, null);
            clearAuth();
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(error);
};
