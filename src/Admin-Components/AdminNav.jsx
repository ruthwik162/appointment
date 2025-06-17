import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
    const navLinks = [
        { name: 'Home', path: '/adminhome' },
        { name: 'View Teachers', path: '/viewteachers' },
        { name: 'View Students', path: '/viewstudents' },
        { name: 'All Appointments', path: '/allappointments' }
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const { user, setUser, navigate, logout, setShowUserLogin, URL } = useAppContext();

    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem("email");
            if (!user && email) {
                try {
                    const res = await fetch(`${URL}/api/users`);
                    const data = await res.json();
                    const currentUser = data.find(u => u.email === email);
                    if (currentUser) {
                        setUser(currentUser);
                    }
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                }
            }
        };
        fetchUser();
    }, [user, setUser]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileDropdownOpen]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-500 z-50 ${isScrolled
                ? "bg-white/90 dark:bg-gray-200/90 shadow-sm backdrop-blur-lg py-3"
                : "py-4 bg-gradient-to-b from-black/20 to-transparent"
            }`}>

            {/* Logo */}
            <NavLink to="/adminhome" className="hover:scale-110 transition-transform duration-200 p-2 rounded-2xl">
                <img className="h-15 rounded object-cover" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <NavLink key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-white" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </NavLink>
                ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                {/* {user?.role === "admin" && (
                    <button
                        onClick={() => navigate("/adminhome")}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Admin
                    </button>
                )} */}

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="profile-dropdown relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        >
                            <div className="relative">
                                <img
                                    src={user.image || assets.profile_icon}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                {isProfileDropdownOpen && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <span className="text-white font-medium hidden lg:inline-block">
                                {user.name?.split(' ')[0] || 'Profile'}
                            </span>
                            <svg
                                className={`w-4 h-4 text-white transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-800">{user.username || 'User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setIsProfileDropdownOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    My Profile
                                </button>
                                {user.role === 'admin' && (
                                    <button
                                        onClick={() => {
                                            navigate("/adminhome");
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Admin Dashboard
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsProfileDropdownOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <svg
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-7 hover:rotate-90 transform transition duration-350 right-4" onClick={() => setIsMenuOpen(false)}>
                    <svg className="h-8 w-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {navLinks.map((link, i) => (
                    <NavLink key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </NavLink>
                ))}


                {user && (
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={user?.image || assets.profile_icon}
                            alt="profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-md"
                        />
                        <p className="font-medium">{user.username || 'User'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                )}

                <button
                    onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                    }}
                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                >
                    Profile
                </button>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-400 transition text-white rounded-full text-sm"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-400 transition text-white rounded-full text-sm"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default AdminNav;