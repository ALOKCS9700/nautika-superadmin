import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const BlogView: React.FC = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const history = useHistory(); // To navigate back to the previous page
    const [blog, setBlog] = useState<any | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null); // To manage open/close FAQ

    useEffect(() => {
        // Fetch the blog by id from the API
        async function fetchBlog() {
            try {
                const response = await axios.get(`http://localhost:5001/admin/nautika/blogs/${blogId}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        fetchBlog();
    }, [blogId]);

    const handlePublish = async () => {
        if (blog) {
            try {
                const updatedBlog = { ...blog, status: "Published" };
                await axios.put(`http://localhost:5001/admin/nautika/blogs/${blog._id}`, updatedBlog);
                setBlog(updatedBlog); // Update state to reflect changes
            } catch (error) {
                console.error("Error publishing blog:", error);
            }
        }
    };

    const handleFaqToggle = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index); // Toggle FAQ open/close
    };

    const handleBackClick = () => {
        history.push("/BlogManagement"); // Go back to the blog list page
    };

    if (!blog) {
        return <div>Blog not found</div>;
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <button onClick={handleBackClick} style={{ border: "none", background: "none", cursor: "pointer", outline: "none" }}>
                <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/back.png"
                    alt="Back"
                    style={{ marginRight: "10px" }}
                />
                Blog List
            </button>
            <div className="blog-view-page">
                <div className="blog-header">
                    <h1 className="blog-title">{blog.title}</h1>
                    <div className="blog-meta">
                        <span className="read-time">{blog.readTime ? `${blog.readTime} min read` : "N/A"}</span>
                        <span className="created-date">{formatDate(blog.createdAt)}</span>
                    </div>
                </div>

                {/* Image */}
                {blog.image && (
                    <div className="blog-image">
                        <img src={blog.image} alt={blog.title} style={{ width: '100%', maxWidth: '600px', margin: '20px auto', display: 'block' }} />
                    </div>
                )}

                {/* Content */}
                <div className="blog-content">
                    <div dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content available.</p>" }} /> {/* Fallback if content is missing */}
                </div>

                {/* FAQ Section */}
                {blog.faqs && blog.faqs.length > 0 ? (
                    <div className="blog-faq">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-container">
                            {blog.faqs.map((faqItem: any, index: number) => (
                                <div key={index} className="faq-item">
                                    <div
                                        className="faq-question"
                                        onClick={() => handleFaqToggle(index)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "10px",
                                            backgroundColor: "#f8f9fa",
                                            marginBottom: "10px",
                                            borderRadius: "5px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span>{faqItem.question}</span>
                                        <span>{openFaqIndex === index ? "▲" : "▼"}</span>
                                    </div>
                                    {openFaqIndex === index && (
                                        <div
                                            className="faq-answer"
                                            style={{
                                                padding: "10px",
                                                backgroundColor: "#fff",
                                                borderRadius: "5px",
                                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                                            }}
                                        >
                                            <p dangerouslySetInnerHTML={{ __html: faqItem.answer }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No FAQs available.</p> /* Fallback if FAQs are missing */
                )}

                {/* Publish Button */}
                <div className="blog-actions">
                    {blog.status !== "Published" && (
                        <button className="btn btn-success" onClick={handlePublish}>
                            Publish Blog
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogView;
