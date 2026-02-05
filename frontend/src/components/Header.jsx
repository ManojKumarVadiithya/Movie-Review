import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const isAdminOrDeveloper = user && (user.role === 'ADMIN' || user.role === 'DEVELOPER');

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    🎬 MovieReview
                </Link>

                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                        <span className="search-icon"></span>
                    </button>
                </form>

                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    {isAdminOrDeveloper && (
                        <Link to="/add-movie" className="nav-link add-movie-btn">
                            ➕ Add Movie
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <>
                            <span className="user-name">Hi, {user?.name}!</span>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
