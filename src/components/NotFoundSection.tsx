import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundSection.css'; // Custom CSS for styling

interface NotFoundSectionProps {
    heading: string;
    subheading: string;
    isShowBtn?: boolean; // Optional prop to show/hide the button
}

const NotFoundSection: React.FC<NotFoundSectionProps> = ({ heading, subheading, isShowBtn = false }) => {
    return (
        <div className="not-found-container">
            <i className="fas fa-exclamation-circle not-found-icon"></i>
            <h2>{heading}</h2>
            <p>{subheading}</p>
            {isShowBtn && (
                <Link to="/blogs" className="go-to-blogs-btn">
                    Go To Blogs
                </Link>
            )}
        </div>
    );
};

export default NotFoundSection;
