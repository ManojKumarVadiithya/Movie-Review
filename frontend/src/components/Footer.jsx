import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/search?q=${encodeURIComponent(category)}`);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* First Column - Brand */}
                <div className="footer-section footer-brand">
                    <h3 className="footer-logo">🎬 MovieReview</h3>
                    <p className="footer-tagline">Discover, Review & Share Your Favorite Movies</p>
                    <p className="footer-description">
                        Your ultimate destination for movie reviews, trailers, and community insights.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon" title="Twitter" aria-label="Twitter">𝕏</a>
                        <a href="#" className="social-icon" title="Facebook" aria-label="Facebook">f</a>
                        <a href="#" className="social-icon" title="Instagram" aria-label="Instagram">📷</a>
                    </div>
                </div>

                {/* Second Column - Quick Links */}
                <div className="footer-section">
                    <h4 className="footer-section-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/">Features</Link></li>
                    </ul>
                </div>

                {/* Third Column - Categories */}
                <div className="footer-section">
                    <h4 className="footer-section-title">Categories</h4>
                    <ul className="footer-links">
                        <li><button className="category-btn" onClick={() => handleCategoryClick('Action')}>Action</button></li>
                        <li><button className="category-btn" onClick={() => handleCategoryClick('Drama')}>Drama</button></li>
                        <li><button className="category-btn" onClick={() => handleCategoryClick('Comedy')}>Comedy</button></li>
                        <li><button className="category-btn" onClick={() => handleCategoryClick('Thriller')}>Thriller</button></li>
                    </ul>
                </div>

                {/* Fourth Column - Support */}
                <div className="footer-section">
                    <h4 className="footer-section-title">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms & Conditions</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="footer-copyright">
                        &copy; {currentYear} MovieReview. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#privacy">Privacy</a>
                        <span className="separator">•</span>
                        <a href="#terms">Terms</a>
                        <span className="separator">•</span>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
