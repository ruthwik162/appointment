import React from 'react'
import { useAppContext } from '../AppContext/AppContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const TeacherNavbar = () => {
    const navLinks = [
        { name: 'Home', path: '/teacher-home' },
        { name: 'approveappointment', path: '/approve-appointment' },

    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, setUser, navigate, logout, setShowUserLogin, URL } = useAppContext();

    // Fetch user profile image from backend
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

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-500 z-50 ${isScrolled
                ? "bg-white/90 dark:bg-gray-200/90 shadow-sm backdrop-blur-lg py-3"
                : "py-4 bg-gradient-to-b from-black/20 to-transparent"
            }`}>

            {/* Logo */}
            <NavLink to="/" className="hover:scale-110 transition-transform duration-200 p-2 rounded-2xl">
                <img className="h-15 rounded object-cover " src={assets.logo} alt="logo" />
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

                {user?.role === "admin" && (
                    <button
                        onClick={() => navigate("/adminhome")}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Admin
                    </button>
                )}


                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img
                            src={user.image || assets.profile_icon}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover "
                        />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li onClick={() => navigate("/profile")} className="p-1.5 pl-3 flex gap-2 hover:bg-primary/10 cursor-pointer">
                                Edit<img className="w-4 items-center justify-center h-4" src={assets.edit} alt="" />
                            </li>
                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex  items-center gap-3 md:hidden">
                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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


                <button onClick={() => { navigate("/profile") }} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Profile
                </button>
                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-400 transition text-white rounded-full text-sm">
                        login
                    </button>

                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-400 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}

            </div>
        </nav>
    );
}

export default TeacherNavbar
