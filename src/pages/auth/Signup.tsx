import { useState, useMemo, type ChangeEvent, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
    type StrengthLevel,
    STRENGTH_COLORS,
    STRENGTH_LABELS,
    STRENGTH_LEVELS,
} from "../../utils/constants/constants";
import { getStrength } from "../../utils/utils";
import { type SignupCredentials } from "../../types/Auth";
import { EyeIcon } from "../../components/EyeIcon";
import { validateSignupForm } from "../../utils/utils";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState<SignupCredentials>({
        username: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [agreed, setAgreed] = useState(false);

    const strength = useMemo(() => getStrength(form.password), [form.password]);
    const passwordsMatch = Boolean(
        form.confirm && form.password === form.confirm,
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    validateSignupForm(form);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateSignupForm(form);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");

        try {
            await signup({
                username: form.username,
                email: form.email,
                password: form.password,
                confirm: form.confirm,
            });
            navigate("/dashboard", { replace: true });
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string; error?: string } };
            };
            const msg =
                axiosError.response?.data?.message ||
                axiosError.response?.data?.error ||
                "Registration failed. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* ── Left panel ── */}
            <div className="auth-panel-left d-none d-lg-flex col-lg-5">
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="auth-logo-mark">
                        <span
                            style={{
                                color: "var(--forest)",
                                fontSize: "1.5rem",
                            }}>
                            ⬡
                        </span>
                    </div>

                    <p className="auth-tagline">
                        Start
                        <br />
                        shortening
                        <br />
                        for free.
                    </p>

                    <p className="auth-sub">
                        Join thousands of marketers, developers, and creators
                        who trust Shortn for smarter link management.
                    </p>

                    {/* Steps */}
                    <div style={{ marginTop: "2.5rem" }}>
                        {(
                            [
                                ["01", "Create your free account"],
                                ["02", "Shorten your first link"],
                                ["03", "Track performance live"],
                            ] as [string, string][]
                        ).map(([num, text]) => (
                            <div
                                key={num}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1rem",
                                }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: "rgba(163,177,138,0.25)",
                                        border: "1px solid rgba(163,177,138,0.4)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--font-display)",
                                        fontSize: "0.75rem",
                                        color: "var(--sage)",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}>
                                    {num}
                                </div>
                                <span
                                    style={{
                                        color: "var(--linen)",
                                        fontSize: "0.9rem",
                                        opacity: 0.9,
                                    }}>
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div
                        style={{
                            marginTop: "2rem",
                            padding: "1rem 1.25rem",
                            background: "rgba(218,215,205,0.08)",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(218,215,205,0.15)",
                        }}>
                        <p
                            style={{
                                color: "var(--sage)",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                margin: 0,
                                lineHeight: 1.7,
                            }}>
                            "Shortn helped us cut our marketing link chaos in
                            half. The analytics alone are worth it."
                        </p>
                        <p
                            style={{
                                color: "var(--linen)",
                                fontSize: "0.75rem",
                                marginTop: "0.5rem",
                                marginBottom: 0,
                                opacity: 0.7,
                            }}>
                            — Chidera O., Growth Lead
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right panel ── */}
            <div className="auth-panel-right col-12 col-lg-7">
                <div
                    className="auth-form-card fade-in-up"
                    style={{ maxWidth: 480 }}>
                    {/* Mobile logo */}
                    <div className="d-flex d-lg-none align-items-center gap-2 mb-4">
                        <span style={{ fontSize: "1.4rem" }}>⬡</span>
                        <span
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                color: "var(--deep)",
                                fontSize: "1.1rem",
                            }}>
                            Shortn
                        </span>
                    </div>

                    <h1 className="auth-form-title">Create your account</h1>
                    <p
                        style={{
                            color: "var(--text-muted)",
                            fontSize: "0.9rem",
                            marginBottom: "1.75rem",
                        }}>
                        Free forever on the Starter plan
                    </p>

                    {/* Error alert */}
                    {error && (
                        <div
                            className="alert mb-3"
                            style={{
                                background: "#fff3f3",
                                border: "1px solid #f8c2c2",
                                color: "#c0392b",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.875rem",
                                padding: "0.6rem 1rem",
                            }}
                            role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">
                                Full name
                            </label>
                            <div className="input-icon-wrapper">
                                <span className="input-icon bi bi-person-fill"></span>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={form.username}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email address
                            </label>
                            <div className="input-icon-wrapper">
                                <span className="input-icon bi bi-envelope-fill"></span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <div className="input-icon-wrapper">
                                <span className="input-icon bi bi-lock-fill"></span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPwd ? "text" : "password"}
                                    className="form-control"
                                    placeholder="At least 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                    disabled={loading}
                                    style={{ paddingRight: "2.6rem" }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPwd((p) => !p)}
                                    tabIndex={-1}
                                    aria-label={
                                        showPwd
                                            ? "Hide password"
                                            : "Show password"
                                    }>
                                    <EyeIcon open={showPwd} />
                                </button>
                            </div>

                            {/* Strength meter */}
                            {form.password && (
                                <div>
                                    <div className="strength-meter mt-2">
                                        {([1, 2, 3, 4] as StrengthLevel[]).map(
                                            (i) => (
                                                <div
                                                    key={i}
                                                    className={`strength-bar ${
                                                        i <= strength
                                                            ? `active-${STRENGTH_LEVELS[strength]}`
                                                            : ""
                                                    }`}
                                                />
                                            ),
                                        )}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: "0.75rem",
                                            marginTop: 4,
                                            marginBottom: 0,
                                            color: STRENGTH_COLORS[strength],
                                            fontWeight: 500,
                                        }}>
                                        {STRENGTH_LABELS[strength]}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="confirm">
                                Confirm password
                            </label>
                            <div className="input-icon-wrapper">
                                <span className="input-icon bi bi-lock-fill"></span>
                                <input
                                    id="confirm"
                                    name="confirm"
                                    type={showConfirm ? "text" : "password"}
                                    className={`form-control ${
                                        form.confirm
                                            ? passwordsMatch
                                                ? "is-valid"
                                                : "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Re-enter password"
                                    value={form.confirm}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                    disabled={loading}
                                    style={{ paddingRight: "2.6rem" }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirm((p) => !p)}
                                    tabIndex={-1}
                                    aria-label={
                                        showConfirm
                                            ? "Hide password"
                                            : "Show password"
                                    }>
                                    <EyeIcon open={showConfirm} />
                                </button>
                            </div>
                            {form.confirm && !passwordsMatch && (
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "#c0392b",
                                        marginTop: 4,
                                    }}>
                                    Passwords don't match
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="form-check mb-3">
                            <input
                                id="terms"
                                className="form-check-input"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAgreed(e.target.checked)
                                }
                                style={{ accentColor: "var(--forest)" }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="terms"
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--text-muted)",
                                }}>
                                I agree to the{" "}
                                <a
                                    href="#"
                                    style={{
                                        color: "var(--fern)",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                    }}>
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    style={{
                                        color: "var(--fern)",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                    }}>
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={loading}
                            style={{
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.95rem",
                            }}>
                            {loading ? (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Creating account…
                                </span>
                            ) : (
                                "Create free account"
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">already have an account?</div>

                    <Link
                        to="/login"
                        className="btn btn-outline-primary w-100 py-2"
                        style={{
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.9rem",
                            textDecoration: "none",
                        }}>
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
