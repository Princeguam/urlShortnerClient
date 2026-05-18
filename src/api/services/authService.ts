import api from "../axios";

import { setAccessToken, clearAccessToken } from "../auth/tokenStorage";
import type {
    AuthResponse,
    LoginCredentials,
    SignupCredentials,
} from "../../types/Auth";

export const loginRequest = async (
    loginDetails: LoginCredentials,
): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", loginDetails);
    setAccessToken(data.accessToken);
    return data;
};

export const signupRequest = async (
    signupDetails: SignupCredentials,
): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(
        "/auth/signup",
        signupDetails,
    );
    setAccessToken(data.accessToken);

    return data;
};

export const logoutRequest = async (): Promise<void> => {
    try {
        await api.post("/auth/logout");
    } finally {
        clearAccessToken();
    }
};

export const meRequest = async () => {
    const { data } = await api.get("/auth/me");

    return data;
};
