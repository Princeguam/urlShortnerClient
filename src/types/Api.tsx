import { type InternalAxiosRequestConfig } from "axios";

// ── Augment InternalAxiosRequestConfig to allow _retry flag ───────────────
export interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
}

export type ApiResponse<T> =
    | {
          success: true;
          message: string;
          data: T;
      }
    | {
          success: false;
          message: string;
          statusCode: number;
      };
