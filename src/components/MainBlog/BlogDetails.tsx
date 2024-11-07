import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CTAButton from '../CTAButton';
import Footer from '../Footer';
import NotFoundSection from '../NotFoundSection';
import './BlogDetails.css';
import CommentSection from './CommentsSection';

const BlogDetails = () => {
  const { id }: any = useParams();
  const [blog, setBlog] = useState(null as any);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0 as any);
  const [relatedBlogs, setRelatedBlogs] = useState([] as any);
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isPastOrToday = date <= today;

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return isPastOrToday ? 'Recently Added' : formattedDate;
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        // Fetch blog details from API using the provided id
        const response = await fetch(`http://134.209.156.80:5001/api/nautika/blogs/${id}`);
        const data = await response.json();
        const formattedDate = formatDate(data.createdAt); // Format the created date

        // Set the blog details with formatted date
        setBlog({
          ...data,
          formattedDate: formattedDate,
        });

        // Fetch related blogs by categoryId, excluding the current blog
        const relatedResponse = await fetch(`http://134.209.156.80:5001/api/nautika/blogs/category/${data.categoryId}`);
        const relatedData = await relatedResponse.json();

        const filteredRelatedBlogs = relatedData.filter((b: any) => b._id !== data._id); // Exclude current blog by ID

        const formattedRelatedBlogs = filteredRelatedBlogs.map((b: any) => ({
          ...b,
          formattedDate: formatDate(b.createdAt),
        }));

        setRelatedBlogs(formattedRelatedBlogs);

      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    if (storedUserInfo.name) {
      setName(storedUserInfo.name);
      setEmail(storedUserInfo.email);
    }

    setComments(storedComments);
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      name,
      email,
      text: comment,
      date: new Date(),
    };

    // Save user info for future comments
    if (!localStorage.getItem('userInfo')) {
      localStorage.setItem('userInfo', JSON.stringify({ name, email }));
    }

    // Save comment in localStorage
    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);

    // Clear comment field after submission
    setComment('');
  };

 

  const handleWhatsAppShare = () => {
    const pageUrl = window.location.href;
    const message = `Check out this blog: ${pageUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index); // Toggle FAQ open/close
  };

  return (
    <div className="d-flex">
      {blog ? (
        <div className="blog-details-container">
          {/* Header with Back and Share Icons */}
          <div className="blog-details-header">
            <Link to="/blogs" className="blog-details-back">
              <i className="fas fa-arrow-left blog-details-back-icon"></i> Back
            </Link>
            <div className="blog-details-share">
              <i className="fab fa-whatsapp blog-details-share-icon" onClick={handleWhatsAppShare} style={{ color: '#25D366' }}></i>
              <i className="fab fa-linkedin blog-details-share-icon" onClick={handleLinkedInShare} style={{ color: '#0077B5' }}></i>
              <i className="fab fa-facebook blog-details-share-icon" onClick={handleFacebookShare} style={{ color: '#1877F2' }}></i>
              <i className="fa-brands fa-x-twitter blog-details-share-icon" onClick={handleTwitterShare} style={{ color: '#000' }}></i>
              <i className="fas fa-copy blog-details-share-icon" onClick={handleCopyLink}></i>
            </div>
          </div>

          {/* Blog Content */}
          <div className="blog-details-content">
            <img src={blog.image} alt={blog.title} className="blog-details-banner" />
            <h1 className="blog-details-title">{blog.title}</h1>
            <p className="blog-details-meta">{blog.readTime} read • {blog.formattedDate}</p>
            <div className="blog-details-text" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* FAQ Section */}
            {blog.faqs && (
              <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <ul className="faq-list">
                  {blog.faqs.map((item: any, index: number) => (
                    <li key={index} className={`faq-item ${openFAQIndex === index ? 'open' : ''}`}>
                      <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        <strong>Q: {item.question}</strong>
                        <i className={`faq-toggle-icon ${openFAQIndex === index ? 'open' : ''}`}>
                          {openFAQIndex === index ? '-' : '+'}
                        </i>
                      </div>
                      {openFAQIndex === index && (
                        <div className="faq-answer">
                          <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <CommentSection blogId={blog._id} />

            {/* Recommended Blogs Section */}
            {relatedBlogs.length > 0 && (
              <div className="recommended-blogs">
                <h2>Recommended Blogs</h2>
                <div className="recommended-blogs-grid">
                  {relatedBlogs.map((relatedBlog: any) => (
                    <div
                      key={relatedBlog._id}
                      className={`recommended-blog-card ${relatedBlogs.length === 1 ? "ifonecardStyle" : ""}`}
                    >
                      <Link
                        to={`/blog/${relatedBlog._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <img src={relatedBlog.image} alt={relatedBlog.title} />
                        <div className="recommended-blog-content">
                          <h3>
                            {relatedBlog.title.length > 30
                              ? `${relatedBlog.title.slice(0, 30)}...`
                              : relatedBlog.title}
                          </h3>
                          <p>{relatedBlog.readTime} read • {relatedBlog.formattedDate}</p>
                        </div>
                      </Link>
                    </div>
                  ))}

                </div>
              </div>
            )}
          </div>

          <div className="blog-list-copy-alert">
            Link copied to clipboard!
          </div>
          <CTAButton />
        </div>
      ) : (
        <div style={{ width: '100%', height: "100%" }}>
          <NotFoundSection
            heading="Blog Not Found"
            subheading="The blog you're trying to view doesn't exist or may have been removed. Please check the URL or explore other blogs."
            isShowBtn={true}
          />
        </div>
      )}
      <Footer />
    </div>
  )
};

export default BlogDetails;
