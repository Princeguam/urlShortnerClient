import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-main)",
                }}>
                <div className="text-center">
                    <div
                        className="spinner-border"
                        style={{
                            color: "var(--forest)",
                            width: "2.5rem",
                            height: "2.5rem",
                        }}
                        role="status"
                    />
                    <p
                        className="mt-3"
                        style={{
                            color: "var(--text-muted)",
                            fontSize: "0.9rem",
                        }}>
                        Verifying session…
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
