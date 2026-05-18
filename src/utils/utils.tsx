import type { SignupCredentials } from "../types/Auth";
import { type StrengthLevel } from "./constants/constants";

export const getStrength = (pwd: string): StrengthLevel => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score as StrengthLevel;
};

export const validateSignupForm = (form: SignupCredentials): string | null => {
    if (!form.username.trim()) return "Full name is required.";
    if (!form.email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return "Enter a valid email.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 8)
        return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    // if (!agreed) return "Please accept the terms to continue.";
    return null;
};
