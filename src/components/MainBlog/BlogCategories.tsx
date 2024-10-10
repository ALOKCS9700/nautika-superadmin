import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogCategories.css';
import CTAButton from '../CTAButton';
import NotFoundSection from '../NotFoundSection';
import axios from 'axios';

const BlogCategories = () => {
  const [categories, setCategories] = useState<any[]>([]); // Set categories to an empty array initially

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://oglitz-backend-node.onrender.com/api/nautika/categories');
        setCategories(response.data); // Set categories to the data from the API
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // The empty dependency array ensures this runs once on component mount

  // Function to generate a random background color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`; // Truncate and add ellipsis
    }
    return description; // Return original if it's shorter than maxLength
  };

  // Handle image error (fallback to placeholder)
  // Handle image error (fallback to placeholder)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'; // Hide the broken image
    const placeholder = e.currentTarget.nextElementSibling as HTMLElement; // Type assertion to HTMLElement
    if (placeholder) {
      placeholder.style.display = 'flex'; // Show the placeholder div
    }
  };

  const handleLinkedInShare = () => {
    const blogUrl = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`, '_blank');
  };

  const handleFacebookShare = () => {
    const blogUrl = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`, '_blank');
  };

  const handleTwitterShare = () => {
    const blogUrl = window.location.href;
    const text = 'Check out this amazing blog: ';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(blogUrl)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyAlert: any = document.querySelector('.blog-list-copy-alert');
    if (copyAlert) {
      copyAlert.style.display = 'block';
      setTimeout(() => {
        copyAlert.style.display = 'none';
      }, 1000);
    }
  };

  const handleWhatsAppShare = () => {
    const pageUrl = window.location.href; // Get the current page URL
    const message = `Check out this page: ${pageUrl}`; // The message to be shared
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`; // Encode URL

    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab
  };

  return (
    <div className="blog-categories-container">
      {/* Back button */}
      <div className="blog-categories-back blog-categories-headerWithShare">
        <Link to="/blogs" className="back-link">
          <i className="fas fa-arrow-left"></i> Go To Blogs
        </Link>
        <div className="blog-details-share">
          <i className="fab fa-whatsapp blog-details-share-icon" onClick={handleWhatsAppShare} style={{ color: '#25D366' }}></i>
          <i className="fab fa-linkedin blog-details-share-icon" onClick={handleLinkedInShare} style={{ color: '#0077B5' }}></i>
          <i className="fab fa-facebook blog-details-share-icon" onClick={handleFacebookShare} style={{ color: '#1877F2' }}></i>
          <i className="fa-brands fa-x-twitter blog-details-share-icon" onClick={handleTwitterShare} style={{ color: '#000' }}></i>
          <i className="fas fa-copy blog-details-share-icon" onClick={handleCopyLink}></i>
        </div>
      </div>

      {/* Header */}
      <h2 className="blog-categories-header">Blog Categories</h2>

      {/* Categories grid */}
      {categories.length === 0 ? (
        <NotFoundSection
          heading="No Categories Available"
          subheading="It looks like there are no categories available at the moment. Please try again later or explore other sections of our site."
        />
      ) : (
        <div className="blog-categories-grid">
          {categories.map((category: any) => (
            <Link to={`/blog-by-category/${category._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={category._id}>
              <div className="blog-categories-card">
                {/* Image with error handling */}
                <div className="blog-count-label">{category.blogCount || 4} Blogs</div>
                {category.image ? (
                  <>
                    <img src={category.image} alt={category.name} onError={handleImageError} />
                    {/* Placeholder div initially hidden, shown on image error */}
                    <div
                      className="blog-categories-placeholder"
                      style={{
                        backgroundColor: "#012367",
                        // backgroundColor: getRandomColor(),
                        display: 'none', // Initially hidden
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: '100%',
                        // height: '150px',
                        color: '#fff',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        width: "100%",
                        height: "180px",
                        borderBottom: "1px solid #ddd",
                        minWidth: "350px",
                      }}
                    >
                      {category.name.slice(0, 2).toUpperCase()}
                    </div>
                  </>
                ) : (
                  <div
                    className="blog-categories-placeholder"
                    style={{
                      // backgroundColor: getRandomColor(),
                      backgroundColor: "#012367",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // width: '100%',
                      // height: '150px',
                      color: '#fff',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      width: "100%",
                      height: "180px",
                      borderBottom: "1px solid #ddd",
                      minWidth: "350px",
                    }}
                  >
                    {category.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="blog-categories-card-content">
                  <h3 className="blog-categories-title">{category.name}</h3>
                  <p className="blog-categories-description">{truncateDescription(category.description, 40)}</p>

                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <CTAButton />
    </div>
  );
};

export default BlogCategories;
