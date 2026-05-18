import axios from "axios";
import { setAccessToken } from "./tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface RefreshResponse {
    accessToken: string;
}

export const refreshAuth = async (): Promise<string> => {
    const { data } = await axios.post<RefreshResponse>(
        `${BASE_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        },
    );
    setAccessToken(data.accessToken);
    return data.accessToken;
};
