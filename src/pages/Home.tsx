import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/shared/PageWrapper";
import LinkCard from "../components/LinkCard";
import type { ShortLink } from "../types/Types";
import type { PaginatedResponse } from "../types/Api";
import api from "../api/axios";

type SortOption = "newest" | "oldest" | "most_clicks";
type FilterOption = "all" | "active" | "expired" | "disabled";

const SORT_LABELS: Record<SortOption, string> = {
    newest: "Newest first",
    oldest: "Oldest first",
    most_clicks: "Most clicks",
};

const Home = () => {
    const navigate = useNavigate();

    const [links, setLinks] = useState<ShortLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOption>("newest");
    const [filter, setFilter] = useState<FilterOption>("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLinks, setTotalLinks] = useState(0);

    const fetchLinks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                sort,
                ...(filter !== "all" && { status: filter }),
                ...(search.trim() && { search: search.trim() }),
            });

            const { data } = await api.get<PaginatedResponse<ShortLink>>(
                `/links?${params.toString()}`,
            );

            setLinks(data.data);
            setTotalPages(data.totalPages);
            setTotalLinks(data.total);
        } catch {
            setError("Failed to load links. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [page, sort, filter, search]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    // Reset to page 1 when filters change
    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleFilter = (value: FilterOption) => {
        setFilter(value);
        setPage(1);
    };

    const handleSort = (value: SortOption) => {
        setSort(value);
        setPage(1);
    };

    return (
        <PageWrapper>
            <div className="container-lg" style={{ maxWidth: 860 }}>
                {/* ── Header ── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "1.75rem",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}>
                    <div>
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                color: "var(--text-dark)",
                                margin: 0,
                            }}>
                            Your Links
                        </h1>
                        <p
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.875rem",
                                margin: "4px 0 0",
                            }}>
                            {totalLinks} link{totalLinks !== 1 ? "s" : ""} total
                        </p>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/links/create")}
                        style={{
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.875rem",
                        }}>
                        + Create short link
                    </button>
                </div>

                {/* ── Filters bar ── */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginBottom: "1.25rem",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}>
                    {/* Search */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search links…"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ maxWidth: 240, fontSize: "0.875rem" }}
                    />

                    {/* Status filter */}
                    <select
                        className="form-select"
                        value={filter}
                        onChange={(e) =>
                            handleFilter(e.target.value as FilterOption)
                        }
                        style={{ maxWidth: 140, fontSize: "0.875rem" }}>
                        <option value="all">All status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="disabled">Disabled</option>
                    </select>

                    {/* Sort */}
                    <select
                        className="form-select"
                        value={sort}
                        onChange={(e) =>
                            handleSort(e.target.value as SortOption)
                        }
                        style={{ maxWidth: 160, fontSize: "0.875rem" }}>
                        {(Object.keys(SORT_LABELS) as SortOption[]).map(
                            (key) => (
                                <option key={key} value={key}>
                                    {SORT_LABELS[key]}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                {/* ── Content ── */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "4rem 0" }}>
                        <div
                            className="spinner-border"
                            style={{
                                color: "var(--forest)",
                                width: "2rem",
                                height: "2rem",
                            }}
                            role="status"
                        />
                    </div>
                )}

                {error && !loading && (
                    <div
                        className="alert"
                        style={{
                            background: "#fff3f3",
                            border: "1px solid #f8c2c2",
                            color: "#c0392b",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.875rem",
                        }}>
                        {error}
                        <button
                            className="btn btn-sm ms-3"
                            onClick={fetchLinks}
                            style={{ fontSize: "0.8rem" }}>
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && links.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "5rem 0",
                            color: "var(--text-muted)",
                        }}>
                        <div
                            style={{
                                fontSize: "2.5rem",
                                marginBottom: "1rem",
                            }}>
                            🔗
                        </div>
                        <p
                            style={{
                                fontWeight: 600,
                                color: "var(--text-dark)",
                                marginBottom: 4,
                            }}>
                            No links yet
                        </p>
                        <p style={{ fontSize: "0.875rem" }}>
                            Create your first short link to get started.
                        </p>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => navigate("/links/create")}
                            style={{
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.875rem",
                            }}>
                            + Create short link
                        </button>
                    </div>
                )}

                {!loading && !error && links.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.65rem",
                        }}>
                        {links.map((link) => (
                            <LinkCard key={link.id} link={link} />
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "2rem",
                        }}>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            style={{ fontSize: "0.8rem" }}>
                            ← Prev
                        </button>
                        <span
                            style={{
                                fontSize: "0.85rem",
                                color: "var(--text-muted)",
                                padding: "0 0.5rem",
                            }}>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            style={{ fontSize: "0.8rem" }}>
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default Home;
