export interface QueuedRequest {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

export let failedQueue: QueuedRequest[] = [];

export const processQueue = (
    error: unknown,
    token: string | null = null,
): void => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token as string);
        }
    });
    failedQueue = [];
};
