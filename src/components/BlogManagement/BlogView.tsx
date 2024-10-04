import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../../common/components/CommonFunction";

const BlogView: React.FC = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const history = useHistory(); // To navigate back to the previous page
    const [blog, setBlog] = useState<any | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null); // To manage open/close FAQ

    useEffect(() => {
        const blogs = getFromLocalStorage('blogs');
        if (blogs) {
            const selectedBlog = blogs.find((blog: any) => blog.id === parseInt(blogId, 10));
            setBlog(selectedBlog);
        }
    }, [blogId]);

    const handlePublish = () => {
        if (blog) {
            const updatedBlog = { ...blog, status: "Published" };
            const blogs = getFromLocalStorage('blogs');
            const updatedBlogs = blogs.map((b: any) => (b.id === blog.id ? updatedBlog : b));
            saveToLocalStorage('blogs', updatedBlogs);
            setBlog(updatedBlog); // Update state to reflect changes
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
                {/* Back Button */}
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
                        <span className="created-date">{formatDate(blog.createdAt.toString())}</span>
                    </div>
                </div>

                {/* Image */}
                {blog.bannerImage && (
                    <div className="blog-image">
                        <img src={blog.bannerImage} alt={blog.title} style={{ width: '100%', maxWidth: '600px', margin: '20px auto', display: 'block' }} />
                    </div>
                )}

                {/* Content */}
                <div className="blog-content">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* FAQ Section */}
                {blog.faq && blog.faq.length > 0 && (
                    <div className="blog-faq">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-container">
                            {blog.faq.map((faqItem: any, index: number) => (
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
