import React from 'react';
import './CTAButton.css'; // Import styles for the CTA button
import { useHistory } from 'react-router-dom';

const CTAButton: React.FC = () => {
    const history = useHistory();

    const handleClick = () => {
        // Navigate to a specific page (e.g., Contact Us)
        window.open('https://gonautika.com/contact-us', '_blank');
    };

    return (
        <div className="cta-button" onClick={handleClick}>
            <i className="fas fa-phone-alt"></i> {/* Example Icon */}
            Contact Us {/* CTA text */}
        </div>
    );
};

export default CTAButton;
