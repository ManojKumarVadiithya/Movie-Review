import React from 'react';
import './StarRating.css';

const StarRating = ({ value, onChange, readOnly = false }) => {
    const [hoverValue, setHoverValue] = React.useState(0);

    const handleClick = (rating) => {
        if (!readOnly) onChange(rating);
    };

    const handleMouseEnter = (rating) => {
        if (!readOnly) setHoverValue(rating);
    };

    const handleMouseLeave = () => {
        if (!readOnly) setHoverValue(0);
    };

    const displayValue = hoverValue || value || 0;

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((rating) => (
                <button
                    key={rating}
                    type="button"
                    className={`star ${rating <= displayValue ? 'filled' : ''}`}
                    onClick={() => handleClick(rating)}
                    onMouseEnter={() => handleMouseEnter(rating)}
                    onMouseLeave={handleMouseLeave}
                    disabled={readOnly}
                >
                    ★
                </button>
            ))}
            <span className="rating-value">
                {displayValue > 0 ? `${displayValue} / 5` : 'Select rating'}
            </span>
        </div>
    );
};

export default StarRating;
