export type PlanName = "free" | "pro" | "business";

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    plan: PlanName;
    createdAt: string;
    [key: string]: unknown;
}

export interface UserStats {
    totalLinks: number;
    totalClicks: number;
    activeLinks: number;
    expiredLinks: number;
    topPerformingUrl: string | null;
}
