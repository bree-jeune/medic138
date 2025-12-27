import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Use Auth Context

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-gray-900">
                    <span className="bg-primary text-white p-1 rounded">M</span>
                    MEDIC 138
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition">Home</Link>
                    <Link to="/games" className="text-sm font-medium text-gray-600 hover:text-primary transition">Skills Lab</Link>
                    <Link to="/courses" className="text-sm font-medium text-gray-600 hover:text-primary transition">Courses</Link>
                    <Link to="/protocols" className="text-sm font-medium text-gray-600 hover:text-primary transition">Protocols</Link>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <User size={16} className="text-gray-500" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
                            </div>
                            <Link to="/dashboard" className="p-2 text-gray-400 hover:text-primary transition" title="Dashboard">
                                <User size={20} />
                            </Link>
                            <button onClick={logout} className="p-2 text-gray-400 hover:text-primary transition" title="Sign Out">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                            <LogIn size={16} />
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg">
                    <Link to="/" className="text-base font-medium text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/games" className="text-base font-medium text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>Skills Lab</Link>
                    <Link to="/courses" className="text-base font-medium text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>Courses</Link>

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />}
                                    <span className="font-medium">{user.displayName}</span>
                                </div>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-600 font-medium flex items-center gap-2">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 text-primary font-bold" onClick={() => setIsMenuOpen(false)}>
                                <LogIn size={18} /> Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
