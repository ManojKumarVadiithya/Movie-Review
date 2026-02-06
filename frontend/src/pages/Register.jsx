import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { useScrollToTop } from '../hooks/useScrollToTop';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { register, isAuthenticated } = useContext(AuthContext);

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
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            await register(email, name, password);
            setSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthModal
                isOpen={showModal}
                title="Already Logged In"
                message="You are already logged in. Please log out first if you want to register another account."
                onClose={handleModalClose}
                confirmText="Go Home"
            />
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-box">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join MovieReview today</p>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    disabled={loading || success}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    disabled={loading || success}
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
                                        disabled={loading || success}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading || success}
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

                            <div className="form-group">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        id="confirm-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        disabled={loading || success}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading || success}
                                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                                        tabIndex="-1"
                                    >
                                        {showConfirmPassword ? (
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

                            {success && (
                                <div className="alert alert-success">
                                    ✓ Account created successfully! Redirecting to login...
                                </div>
                            )}

                            {error && <div className="alert alert-error">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading || success || !name || !email || !password || !confirmPassword}
                                className="btn-submit"
                            >
                                {loading ? 'Creating account...' : success ? 'Redirecting...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="auth-footer">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
