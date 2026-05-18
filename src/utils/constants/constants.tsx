export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export const STRENGTH_LABELS: Record<StrengthLevel, string> = {
    0: "",
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
};

export const STRENGTH_LEVELS: Record<StrengthLevel, string> = {
    0: "",
    1: "weak",
    2: "fair",
    3: "good",
    4: "strong",
};

export const STRENGTH_COLORS: Record<StrengthLevel, string> = {
    0: "",
    1: "#e74c3c",
    2: "#f39c12",
    3: "var(--sage)",
    4: "var(--forest)",
};

export const Strings = {
    kUserKey: "user",
    kAccessTokenKey: "accessToken",
    kRefreshTokenKey: "refreshToken",
};
