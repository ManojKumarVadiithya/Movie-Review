import React from 'react';
import './OTTPlatforms.css';

const OTTPlatforms = ({ platforms }) => {
    if (!platforms || platforms.length === 0) {
        return (
            <div className="ott-section">
                <h3>Where to Watch</h3>
                <p className="no-platforms">No streaming information available</p>
            </div>
        );
    }

    return (
        <div className="ott-section">
            <h3>Where to Watch</h3>
            <div className="ott-platforms-container">
                {platforms.map((platform, idx) => (
                    <a
                        key={idx}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ott-platform-card"
                        title={`Watch on ${platform.name}`}
                    >
                        {platform.logo ? (
                            <img src={platform.logo} alt={platform.name} className="ott-logo" />
                        ) : (
                            <div className="ott-placeholder">{platform.name.charAt(0)}</div>
                        )}
                        <span className="ott-name">{platform.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default OTTPlatforms;
