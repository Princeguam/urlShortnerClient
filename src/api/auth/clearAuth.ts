import { clearAccessToken } from "./tokenStorage";

export const clearAuth = (): void => {
    clearAccessToken();
};
