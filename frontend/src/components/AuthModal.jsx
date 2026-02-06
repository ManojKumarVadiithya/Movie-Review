import React from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, title, message, onClose, onConfirm, confirmText = 'OK', showConfirm = false }) => {
    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="auth-modal-title">{title}</h2>
                <p className="auth-modal-message">{message}</p>
                <div className="auth-modal-buttons">
                    {showConfirm ? (
                        <>
                            <button className="btn-cancel" onClick={onClose}>Cancel</button>
                            <button className="btn-confirm" onClick={onConfirm}>{confirmText}</button>
                        </>
                    ) : (
                        <button className="btn-primary" onClick={onClose}>{confirmText}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
