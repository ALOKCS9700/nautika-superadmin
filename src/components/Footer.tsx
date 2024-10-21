import React from 'react';
import { footerTop, nautika } from '../common/components/CommonFunction';
import './Footer.css'; // Make sure to create this CSS file and include the styles

const Footer = () => {
    return (
        <>
            <div className="footer_top">
                <img src={footerTop} alt="image" width="100%" />
            </div>
            <footer className="footer">
                <div className="footer-logo">
                    <img src={nautika} alt="Nautika Logo" className="nautika-logo" />
                </div>
                <div className="footer-container">
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>1st Floor Baha'i House, Foreshore Road Port Blair – 744102</p>
                        <a href="mailto:info@gonautika.com"> info@gonautika.com</a>
                        <a href="tel:+913192239209"> 03192 - 239209, 239210 </a>
                        <a href="tel:+919933233222"> +91 - 9933233222</a>
                        <a href="tel:+919474233222"> +91 - 9474233222</a>
                        <a href="tel:+918900902200"> +91 - 8900902200</a>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Nautika</a></li>
                            <li><a href="#">Nautika Lite</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Port Blair</a></li>
                            <li><a href="#">Havelock</a></li>
                            <li><a href="#">Neil</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Get in Touch</a></li>
                            <li><a href="#">Help center</a></li>
                            <li><a href="#">Live chat</a></li>
                            <li><a href="#">How it works</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Condition</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © 2024 Nautika | All rights reserved.</p>
                </div>
            </footer >
        </>
    );
};

export default Footer;
