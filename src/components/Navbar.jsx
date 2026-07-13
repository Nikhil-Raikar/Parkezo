import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, PlusCircle, FileText, Menu, X, Moon, Sun, AlertCircle, User, Shield } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    const navLinks = [
        { path: '/', label: 'Find Parking', icon: <MapPin size={20} /> },
        { path: '/host', label: 'Host a Spot', icon: <PlusCircle size={20} /> },
        { path: '/echallan', label: 'eChallan', icon: <FileText size={20} /> },
        { path: '/report', label: 'Report Violation', icon: <AlertCircle size={20} /> },
    ];

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <h2>Park<span className="text-primary">Ezo</span></h2>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="navbar-menu desktop-menu">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions border-left">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/user" className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <User size={18} /> <span className="hide-mobile">Profile</span>
                    </Link>
                    <Link to="/admin" className="btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Shield size={18} /> <span className="hide-mobile">Admin</span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu glass">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
