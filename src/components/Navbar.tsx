import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        await logout();
        navigate("/login", { replace: true });
    };

    const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? "var(--sage)" : "var(--linen)",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: 500,
        opacity: isActive ? 1 : 0.8,
        borderBottom: isActive
            ? "2px solid var(--sage)"
            : "2px solid transparent",
        paddingBottom: "2px",
        transition: "all 0.2s ease",
    });

    return (
        <nav
            className="navbar-forest"
            style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                padding: "0 1.5rem",
                position: "sticky",
                top: 0,
                zIndex: 100,
                gap: "2rem",
            }}>
            {/* Brand */}
            <Link
                to="/dashboard"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    flexShrink: 0,
                }}>
                <span style={{ fontSize: "1.3rem" }}>⬡</span>
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "var(--linen)",
                        fontSize: "1.1rem",
                        letterSpacing: "-0.01em",
                    }}>
                    Shortn
                </span>
            </Link>

            {/* Nav links */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    flex: 1,
                }}>
                <NavLink to="/dashboard" style={navLinkStyle}>
                    Dashboard
                </NavLink>
                <NavLink to="/profile" style={navLinkStyle}>
                    Profile
                </NavLink>
                <NavLink to="/subscription" style={navLinkStyle}>
                    Plans
                </NavLink>
            </div>

            {/* Right side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexShrink: 0,
                }}>
                {/* Create button */}
                <Link
                    to="/links/create"
                    className="btn btn-secondary"
                    style={{
                        padding: "0.35rem 1rem",
                        fontSize: "0.8rem",
                        borderRadius: "var(--radius-sm)",
                    }}>
                    + New Link
                </Link>

                {/* Avatar dropdown */}
                <div className="dropdown">
                    <button
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                            background: "rgba(163,177,138,0.2)",
                            border: "1px solid rgba(163,177,138,0.3)",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--linen)",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}>
                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </button>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{
                            border: "1px solid var(--border-light)",
                            borderRadius: "var(--radius-md)",
                            boxShadow: "var(--shadow-md)",
                            minWidth: 200,
                            padding: "0.5rem",
                        }}>
                        <li style={{ padding: "0.5rem 0.75rem 0.75rem" }}>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--text-dark)",
                                }}>
                                {user?.name}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "var(--text-muted)",
                                }}>
                                {user?.email}
                            </div>
                        </li>
                        <li>
                            <hr
                                className="dropdown-divider"
                                style={{ margin: "0 0 0.5rem" }}
                            />
                        </li>
                        <li>
                            <Link
                                className="dropdown-item"
                                to="/profile"
                                style={{
                                    fontSize: "0.875rem",
                                    borderRadius: "var(--radius-sm)",
                                }}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown-item"
                                to="/subscription"
                                style={{
                                    fontSize: "0.875rem",
                                    borderRadius: "var(--radius-sm)",
                                }}>
                                Subscription
                            </Link>
                        </li>
                        <li>
                            <hr
                                className="dropdown-divider"
                                style={{ margin: "0.5rem 0" }}
                            />
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                style={{
                                    fontSize: "0.875rem",
                                    color: "#c0392b",
                                    borderRadius: "var(--radius-sm)",
                                    width: "100%",
                                    textAlign: "left",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}>
                                {loggingOut ? "Signing out…" : "Sign out"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
