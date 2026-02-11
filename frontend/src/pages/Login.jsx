import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { useScrollToTop } from '../hooks/useScrollToTop';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useContext(AuthContext);

    useScrollToTop();

    useEffect(() => {
        if (isAuthenticated) {
            setShowModal(true);
        }
    }, [isAuthenticated]);

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthModal
                isOpen={showModal}
                title="Already Logged In"
                message="You are already logged in. Redirecting to home..."
                onClose={handleModalClose}
                confirmText="Go Home"
            />
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-box">
                        <h1 className="auth-title">Sign In</h1>
                        <p className="auth-subtitle">Welcome back to MovieReview</p>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && <div className="alert alert-error">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading || !email || !password}
                                className="btn-submit"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <p className="auth-footer">
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
