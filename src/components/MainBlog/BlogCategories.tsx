import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogCategories.css';

const BlogCategories = () => {
  const [categories, setCategories] = useState([] as any);

  useEffect(() => {
    const demoCategories = [
      {
        id: 1,
        name: 'JavaScript',
        image: 'https://plus.unsplash.com/premium_photo-1670430227121-a37b0efb7457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym95cyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'JavaScript is a versatile language used to create interactive effects within web browsers.',
        blogCount: 4 // 4 blogs from demoBlogs
      },
      {
        id: 2,
        name: 'CSS',
        image: 'https://plus.unsplash.com/premium_photo-1669927131902-a64115445f0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym95cyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'CSS is used to style and layout web pages — from text styles to complex layouts.',
        blogCount: 4 // 4 blogs from demoBlogs
      },
      {
        id: 3,
        name: 'React',
        image: 'https://plus.unsplash.com/premium_vector-1682309080127-19d3a6214a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'React is a popular JavaScript library for building user interfaces.',
        blogCount: 4 // 4 blogs from demoBlogs
      },
      {
        id: 4,
        name: 'TypeScript',
        image: 'https://plus.unsplash.com/premium_vector-1682303219575-c521139db33c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'TypeScript is a strict syntactical superset of JavaScript that adds static typing.',
        blogCount: 4 // 4 blogs from demoBlogs
      },
      {
        id: 5,
        name: 'Node.js',
        image: 'https://plus.unsplash.com/premium_vector-1681408004997-50cea8e61545?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Node.js allows JavaScript to run server-side, enabling full-stack JavaScript development.',
        blogCount: 4 // 4 blogs from demoBlogs
      },
      {
        id: 6,
        name: 'Web Development',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
        description: 'Web development is the work involved in developing a website for the Internet or an intranet.',
        blogCount: 4 // 4 blogs from demoBlogs
      }
    ];




    setCategories(demoCategories);
  }, []);

  return (
    <div className="blog-categories-container">
      {/* Back button */}
      <div className="blog-categories-back">
        <Link to="/blogs" className="back-link">
          <i className="fas fa-arrow-left"></i> Go To Blogs
        </Link>
      </div>

      {/* Header */}
      <h2 className="blog-categories-header">Blog Categories</h2>

      {/* Categories grid */}
      <div className="blog-categories-grid">
        {categories.map((category: any) => (
          <Link to={`/blog-by-category/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div key={category.name} className="blog-categories-card">
              {/* Blog count label */}
              <div className="blog-count-label">{category.blogCount} Blogs</div>
              <img src={category.image} alt={category.name} />
              <div className="blog-categories-card-content">
                <h3 className="blog-categories-title">{category.name}</h3>
                <p className="blog-categories-description">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
