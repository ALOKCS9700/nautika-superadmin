import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogsList.css'; // Import the custom CSS file
import CTAButton from '../CTAButton';
import NotFoundSection from '../NotFoundSection';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([] as any);
  const [categories, setCategories] = useState([{ _id: 'all', name: 'All', image: '', description: '', keywords: [] }] as any);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading, setLoading] = useState(false); // Loading state

  // Default fallback image URL
  const defaultImageUrl = 'https://via.placeholder.com/500x300.png?text=No+Image+Available';

  // Handle image error to display fallback placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const placeholderDiv = e.currentTarget.nextElementSibling as HTMLElement; // Type assertion to HTMLElement
    if (placeholderDiv) {
      placeholderDiv.style.display = 'flex'; // Show the placeholder div
    }
    e.currentTarget.style.display = 'none'; // Hide the image element
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://oglitz-backend-node.onrender.com/api/nautika/categories');
        const data = await response.json();

        // Add "All" category statically at the beginning
        const allCategory = {
          _id: 'all',
          name: 'All',
          image: 'https://plus.unsplash.com/premium_photo-1669295395768-6ef852fddc90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
          description: 'All categories combined.',
        };

        setCategories([allCategory, ...data]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch blogs based on selected category and search query
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Set loading to true
      try {
        const payload = {
          categoryId: selectedCategory === 'All' ? '' : categories.find((category: any) => category.name === selectedCategory)._id || '',
          searchText: searchQuery || '',
        };

        const response = await fetch('https://oglitz-backend-node.onrender.com/api/nautika/blogs/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const today = new Date();
          const isPastOrToday = date <= today;

          const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-GB', options);

          return isPastOrToday ? 'Recently Added' : formattedDate;
        };

        const blogsWithFormattedDate = data.map((blog: any) => ({
          ...blog,
          formattedDate: formatDate(blog.createdAt),
          bannerImage: blog.image || "", // Use default image if bannerImage is missing
        }));

        setBlogs(blogsWithFormattedDate);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
      setLoading(false); // Set loading to false
    };

    fetchBlogs();
  }, [selectedCategory, searchQuery, categories]); // Fetch blogs when category or search query changes

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

  return (
    <>
      <div className="blog-list-container">
        <div className="blog-list-header">
          <Link to="/" className="blog-list-back">
            <i className="fas fa-arrow-left blog-list-back-icon"></i> Go To Home
          </Link>
          <div className="blog-details-share">
            <i className="fab fa-whatsapp blog-details-share-icon" onClick={handleWhatsAppShare} style={{ color: '#25D366' }}></i>
            <i className="fab fa-linkedin blog-details-share-icon" onClick={handleLinkedInShare} style={{ color: '#0077B5' }}></i>
            <i className="fab fa-facebook blog-details-share-icon" onClick={handleFacebookShare} style={{ color: '#1877F2' }}></i>
            <i className="fa-brands fa-x-twitter blog-details-share-icon" onClick={handleTwitterShare} style={{ color: '#000' }}></i>
            <i className="fas fa-copy blog-details-share-icon" onClick={handleCopyLink}></i>
          </div>
        </div>

        {/* Search bar and View All Button */}
        <div className="view-all-container searchWithButtonStyle">
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
              className="blog-search-input modern-search-bar"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <Link to="/categories" className="view-all-link">
            <i className="fas fa-th"></i> View All Categories
          </Link>
        </div>

        {/* Category scrollable section */}
        <div className="category-scroll">
          {categories.map((category: any) => (
            <div
              key={category._id}
              className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.image ? (
                <>
                  <img src={category.image} alt={category.name} onError={handleImageError} />
                  <div
                    className="blog-categories-placeholder"
                    style={{
                      backgroundColor: "#012367",
                      display: 'none', // Initially hidden
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#fff',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%"
                    }}
                  >
                    {category.name.slice(0, 2).toUpperCase()}
                  </div>
                </>
              ) : (
                <div
                  className="blog-categories-placeholder"
                  style={{
                    backgroundColor: "#012367",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%"
                  }}
                >
                  {category.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Blog list */}
        {loading ? (
          <div className="loading">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <NotFoundSection
            heading="No Blogs Found"
            subheading="It seems there are no blogs that match your search criteria. Try adjusting your search or filter."
          />
        ) : (
          <div className="blog-list-grid">
            {blogs.map((blog: any) => (
              <div key={blog._id} className="blog-list-card">
                {console.log("blogblogblogblog", blog)}
                <div className="blog-labels">
                  <span className="blog-category-label">{blog.categoryName}</span>
                  <span className="blog-date-label">{blog.formattedDate}</span>
                </div>
                <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* <img src={blog.bannerImage} alt={blog.title} /> */}
                  {
                    blog.bannerImage ? (
                      <>
                        <img
                          src={blog.bannerImage}
                          alt={blog.title}
                          onError={(e) => {
                            const placeholderDiv = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholderDiv) {
                              placeholderDiv.style.display = 'flex'; // Show the placeholder if the image fails
                            }
                            e.currentTarget.style.display = 'none'; // Hide the image element on error
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: "#012367",
                            display: 'none', // Initially hidden, shown on image error
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "100%",
                            height: "200px",
                            borderBottom: "1px solid #ddd",
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            minWidth: "350px",
                          }}
                        >
                          {blog.title.slice(0, 2).toUpperCase()}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#012367",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: "100%",
                          minWidth: "350px",
                          height: "200px",
                          borderBottom: "1px solid #ddd",
                          color: '#fff',
                          fontSize: '24px',
                          fontWeight: 'bold',
                        }}
                      >
                        {blog.title.slice(0, 2).toUpperCase()}
                      </div>
                    )
                  }

                  <div className="blog-list-card-content">
                    <h3 className="blog-list-title">
                      {blog.title.length > 30 ? `${blog.title.slice(0, 30)}...` : blog.title}
                    </h3>
                    <p className="blog-list-read-time">
                      <i className="fas fa-clock"></i> {blog.readTime} read
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="blog-list-copy-alert">
          Link copied to clipboard!
        </div>
      </div>
      <CTAButton />
    </>
  );
};

export default BlogsList;
