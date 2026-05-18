import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { type LoginForm } from "../../types/Auth";
import { EyeIcon } from "../../components/EyeIcon";

// ── Types ──────────────────────────────────────────────────────────────────

// ── Component ──────────────────────────────────────────────────────────────

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // location.state is typed as unknown in react-router-dom v6
    const from =
        (location.state as { from?: { pathname?: string } } | null)?.from
            ?.pathname ?? "/dashboard";

    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await login(form);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string; error?: string } };
            };
            const msg =
                axiosError.response?.data?.message ||
                axiosError.response?.data?.error ||
                "Login failed. Check your credentials.";
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
                        Short links,
                        <br />
                        big impact.
                    </p>

                    <p className="auth-sub">
                        Track clicks, manage links, and understand your audience
                        — all from one clean dashboard.
                    </p>

                    <ul className="auth-feature-list">
                        <li>Custom short URLs with your brand</li>
                        <li>Real-time click analytics</li>
                        <li>Link expiration &amp; scheduling</li>
                        <li>Team collaboration tools</li>
                    </ul>

                    {/* Decorative stats */}
                    <div
                        style={{
                            marginTop: "2.5rem",
                            padding: "1.25rem 1.5rem",
                            background: "rgba(218,215,205,0.1)",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(218,215,205,0.2)",
                            backdropFilter: "blur(4px)",
                        }}>
                        <div style={{ display: "flex", gap: "2rem" }}>
                            {(
                                [
                                    ["2.4M+", "Links Created"],
                                    ["99.9%", "Uptime"],
                                    ["180+", "Countries"],
                                ] as [string, string][]
                            ).map(([val, label]) => (
                                <div key={label}>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.5rem",
                                            fontWeight: 700,
                                            color: "var(--linen)",
                                        }}>
                                        {val}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "var(--sage)",
                                            marginTop: 2,
                                        }}>
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right panel ── */}
            <div className="auth-panel-right col-12 col-lg-7">
                <div className="auth-form-card fade-in-up">
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

                    <h1 className="auth-form-title">Welcome back</h1>
                    <p
                        style={{
                            color: "var(--text-muted)",
                            fontSize: "0.9rem",
                            marginBottom: "1.75rem",
                        }}>
                        Sign in to your account to continue
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
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <label
                                    className="form-label"
                                    htmlFor="password">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "var(--fern)",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                    }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="input-icon-wrapper">
                                <span className="input-icon bi bi-lock-fill"></span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPwd ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
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
                        </div>

                        {/* Remember me */}
                        <div className="form-check mt-3 mb-3">
                            <input
                                id="remember"
                                className="form-check-input"
                                type="checkbox"
                                style={{ accentColor: "var(--forest)" }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="remember"
                                style={{
                                    fontSize: "0.875rem",
                                    color: "var(--text-muted)",
                                }}>
                                Keep me signed in
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
                                    Signing in…
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">or</div>

                    <p
                        className="text-center mb-0"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--text-muted)",
                        }}>
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            style={{
                                color: "var(--forest)",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}>
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
