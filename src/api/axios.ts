import axios from "axios";
import { requestInterceptor } from "./interceptors/requestInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

const BASE_URL =
    import.meta.env.VITE_APIV1_URL || "http://localhost:3000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// ── Response interceptor: silent token refresh on 401 ─────────────────────
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use((response) => response, responseInterceptor);

export default api;
