import React, { useState } from 'react';
import './ContactForm.css';
import Footer from './Footer';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        message: '',
    });

    const [error, setError] = useState({
        fullName: false,
        email: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validation
        if (!formData.fullName) {
            setError((prev) => ({ ...prev, fullName: true }));
            setTimeout(() => {
                setError((prev) => ({ ...prev, fullName: false }));
            }, 2000);
            return;
        }
        if (!formData.email) {
            setError((prev) => ({ ...prev, email: true }));
            setTimeout(() => {
                setError((prev) => ({ ...prev, email: false }));
            }, 2000);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xovqaoqy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    mobile: formData.mobile,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSuccessMessage('Message sent successfully!');
                setTimeout(() => {
                    setSuccessMessage("")
                }, 1000);
                setFormData({ fullName: '', email: '', mobile: '', message: '' });
                setError({ fullName: false, email: false });
            } else {
                setErrorMessage('Failed to send message. Please try again.');
                setTimeout(() => {
                    setErrorMessage("")
                }, 1000);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setTimeout(() => {
                setErrorMessage("")
            }, 1000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex">
            <div className="contact-form-container-custom">
                <button className="back-button-custom" onClick={() => window.history.back()}>
                    <i className="fas fa-arrow-left blog-details-back-icon"></i> Back
                </button>
                <h2 className="contact-form-title">Contact Us</h2>
                <p className="contact-form-description">Leave us your info</p>
                <form onSubmit={handleSubmit} className="contact-form-custom">
                    <div className="form-group-custom">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={error.fullName ? 'input-error-custom' : ''}
                        />
                        {error.fullName && <span className="error-text-custom">Your Name is mandatory!</span>}
                    </div>
                    <div className="form-group-custom">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={error.email ? 'input-error-custom' : ''}
                        />
                        {error.email && <span className="error-text-custom">Email is mandatory!</span>}
                    </div>
                    <div className="form-group-custom">
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group-custom">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-button-custom" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                    </button>
                    {successMessage && <p className="success-text-custom">{successMessage}</p>}
                    {errorMessage && <p className="error-text-custom">{errorMessage}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ContactForm;
