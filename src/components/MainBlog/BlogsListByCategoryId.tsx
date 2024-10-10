import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogsList.css'; // Import the custom CSS file
import CTAButton from '../CTAButton';
import axios from 'axios';

const BlogsListByCategoryId = () => {
  const { id }: any = useParams();
  const [blogs, setBlogs] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);

  // Fetch blogs by category ID from API
  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const response = await axios.get(`https://oglitz-backend-node.onrender.com/api/nautika/blogs/category/${id}`);
        const blogsWithFormattedDate = response.data.map((blog: any) => ({
          ...blog,
          formattedDate: formatDate(blog.createdAt),
        }));
        setBlogs(blogsWithFormattedDate);
        setLoading(false);
      } catch (error) {
        setError('Failed to load blogs.');
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [id]);

  // Function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isPastOrToday = date <= today;

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return isPastOrToday ? 'Recently Added' : formattedDate;
  };


  // Handling blog list rendering
  const renderBlogs = () => {
    if (loading) return <p>Loading blogs...</p>;
    if (error) return <p>{error}</p>;

    if (blogs.length === 0) return <p>No blogs found for this category.</p>;

    return (
      <div className="blog-list-grid">
        {blogs.map((blog: any) => (
          <div key={blog._id} className="blog-list-card">
            <div className="blog-labels">
              {console.log("blogblogblogblogblogblog", blog)}
              <span className="blog-category-label">{blog.categoryName}</span>
              <span className="blog-date-label">{blog.formattedDate}</span>
            </div>
            <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* <img src={blog.image || 'default_image_url'} alt={blog.title} /> */}
              {
                blog.image ? (
                  <>
                    <img
                      src={blog.image}
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
                  <i className="fas fa-clock"></i> {blog.readTime} min read
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <Link to="/categories" className="blog-list-back">
          <i className="fas fa-arrow-left blog-list-back-icon"></i> Go To Categories
        </Link>
        <div className="blog-details-share">
          {/* Social media icons with share functionality */}
        </div>
      </div>

      {/* Blog list grid */}
      {renderBlogs()}

      <CTAButton />
    </div>
  );
};

export default BlogsListByCategoryId;
