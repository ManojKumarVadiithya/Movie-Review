import React, { useEffect } from 'react';
import './TrailerPlayer.css';

const TrailerPlayer = ({ trailerLink, movieTitle }) => {
    useEffect(() => {
        return () => {
            // Cleanup on unmount
        };
    }, []);

    const getEmbedUrl = (url) => {
        if (!url) return '';

        // Handle YouTube URLs
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtube.com/watch')) {
                videoId = url.split('v=')[1]?.split('&')[0];
            } else if (url.includes('youtu.be')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
            }
            if (videoId) {
                // No autoplay - users will click to play
                return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
            }
        }

        // Handle direct URLs
        if (url.startsWith('http')) {
            return url;
        }

        return '';
    };

    const embedUrl = getEmbedUrl(trailerLink);

    return (
        <div className="trailer-player">
            <div className="player-container">
                <h2 className="player-title">Watch Trailer: {movieTitle}</h2>
                {embedUrl ? (
                    <iframe
                        title={`${movieTitle} Trailer`}
                        className="trailer-iframe"
                        src={embedUrl}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                ) : (
                    <div className="no-trailer">
                        <p>Trailer not available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrailerPlayer;
