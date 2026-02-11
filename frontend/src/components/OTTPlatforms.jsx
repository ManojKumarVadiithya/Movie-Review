import React from 'react';
import './OTTPlatforms.css';

const OTTPlatforms = ({ platforms }) => {

    if (!platforms || platforms.length === 0) {
        return (
            <div className="ott-empty">
                Streaming information not available
            </div>
        );
    }

    return (
        <div className="ott-scroll-container">
            {platforms.map((platform, idx) => (
                <a
                    key={idx}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ott-pill"
                >
                    {platform.logo ? (
                        <img
                            src={platform.logo}
                            alt={platform.name}
                            className="ott-logo"
                        />
                    ) : (
                        <div className="ott-placeholder">
                            {platform.name.charAt(0)}
                        </div>
                    )}
                    <span className="ott-name">{platform.name}</span>
                </a>
            ))}
        </div>
    );
};

export default OTTPlatforms;
