import React from 'react';
import './TrailerPlayer.css';

const TrailerPlayer = ({ trailerLink, movieTitle }) => {

    const getEmbedUrl = (url) => {
        if (!url) return '';

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtube.com/watch')) {
                videoId = url.split('v=')[1]?.split('&')[0];
            } else if (url.includes('youtu.be')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
            }
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?rel=0`;
            }
        }

        if (url.startsWith('http')) return url;

        return '';
    };

    const embedUrl = getEmbedUrl(trailerLink);

    return (
        <div className="trailer-wrapper">

            {embedUrl ? (
                <div className="video-container">
                    <iframe
                        title={`${movieTitle} Trailer`}
                        src={embedUrl}
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            ) : (
                <div className="no-trailer">
                    Trailer not available
                </div>
            )}

        </div>
    );
};

export default TrailerPlayer;
