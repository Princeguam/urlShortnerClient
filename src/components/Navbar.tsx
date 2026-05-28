import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [loggingOut, setLoggingOut] = useState(false)
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        setLoggingOut(true)
        await logout()
        navigate('/login', { replace: true })
    }

    const navClass = (isActive: boolean) =>
        `text-sm font-medium no-underline px-1 pb-1 transition-all ${
            isActive ? 'text-sage border-b-2 border-sage' : 'text-linen opacity-80'
        }`

    return (
        <nav className="sticky top-0 z-50 bg-deep border-b border-forest">
            <div className="max-w-[1200px] mx-auto flex items-center h-16 px-6 gap-8">
                {/* Brand */}
                <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
                    <span className="text-xl">⬡</span>
                    <span className="font-display font-bold text-linen text-lg -tracking-[0.01em]">
                        Shortn
                    </span>
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-6 flex-1">
                    <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => navClass(isActive)}>
                        Profile
                    </NavLink>
                    <NavLink to="/subscription" className={({ isActive }) => navClass(isActive)}>
                        Plans
                    </NavLink>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/links/create"
                        className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-md bg-sage text-deep hover:bg-fern"
                    >
                        + New Link
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            className="w-9 h-9 rounded-full bg-[rgba(163,177,138,0.2)] border border-[rgba(163,177,138,0.3)] flex items-center justify-center text-linen font-bold text-sm"
                        >
                            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg p-2">
                                <div className="px-3 py-2">
                                    <div className="text-sm font-semibold text-text-dark">{user?.name}</div>
                                    <div className="text-xs text-text-muted">{user?.email}</div>
                                </div>
                                <div className="border-t border-gray-100 my-2" />
                                <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                                    Profile
                                </Link>
                                <Link to="/subscription" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                                    Subscription
                                </Link>
                                <div className="border-t border-gray-100 my-2" />
                                <button
                                    onClick={handleLogout}
                                    disabled={loggingOut}
                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded"
                                >
                                    {loggingOut ? 'Signing out…' : 'Sign out'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
