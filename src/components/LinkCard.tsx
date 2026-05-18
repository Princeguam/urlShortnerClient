import { useNavigate } from "react-router-dom";
import type { ShortLink } from "../types/Types";

interface Props {
    link: ShortLink;
}

const STATUS_STYLES: Record<
    ShortLink["status"],
    { bg: string; color: string; label: string }
> = {
    active: { bg: "#e8f5e9", color: "var(--forest)", label: "Active" },
    expired: { bg: "#fff3e0", color: "#e65100", label: "Expired" },
    disabled: { bg: "#f5f5f5", color: "#757575", label: "Disabled" },
};

const LinkCard = ({ link }: Props) => {
    const navigate = useNavigate();
    const status = STATUS_STYLES[link.status];

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(link.shortUrl);
    };

    return (
        <div
            onClick={() => navigate(`/links/${link.id}`)}
            style={{
                background: "white",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.1rem 1.25rem",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease, transform 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "var(--shadow-md)";
                (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "none";
            }}>
            {/* Icon */}
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    flexShrink: 0,
                }}>
                🔗
            </div>

            {/* Main info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "var(--text-dark)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>
                    {link.title ?? link.shortCode}
                </div>
                <div
                    style={{
                        fontSize: "0.8rem",
                        color: "var(--fern)",
                        fontWeight: 500,
                        marginTop: 2,
                    }}>
                    {link.shortUrl}
                </div>
                <div
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>
                    {link.originalUrl}
                </div>
            </div>

            {/* Stats */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    minWidth: 64,
                }}>
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "var(--forest)",
                        lineHeight: 1,
                    }}>
                    {link.totalClicks.toLocaleString()}
                </span>
                <span
                    style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                    }}>
                    clicks
                </span>
            </div>

            {/* Status badge */}
            <div
                style={{
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: status.bg,
                    color: status.color,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    flexShrink: 0,
                }}>
                {status.label}
            </div>

            {/* Copy button */}
            <button
                onClick={handleCopy}
                title="Copy short URL"
                style={{
                    background: "var(--bg-muted)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    flexShrink: 0,
                    transition: "all 0.15s",
                }}
                onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                        "var(--forest)")
                }
                onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                        "var(--text-muted)")
                }>
                Copy
            </button>
        </div>
    );
};

export default LinkCard;
