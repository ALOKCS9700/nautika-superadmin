import React from 'react';
import './CTAButton.css'; // Import styles for the CTA button
import { Link, useHistory } from 'react-router-dom';

const CTAButton: React.FC = () => {
    const history = useHistory();

    const handleClick = () => {
        // Navigate to a specific page (e.g., Contact Us)
        window.open('contact-us', '_blank');
    };

    return (
        <Link className="cta-button" to={"/contact-us"}>
            <i className="fas fa-phone-alt"></i> {/* Example Icon */}
            Contact Us {/* CTA text */}
        </Link>
    );
};

export default CTAButton;
