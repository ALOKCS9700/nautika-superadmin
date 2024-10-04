import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm: React.FC<{ blog: any | null, onSave: (blog: any) => void, onClose: () => void }> = ({ blog, onSave, onClose }) => {
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [content, setContent] = useState(blog ? blog.content : "");
  const [faq, setFaq] = useState(blog ? blog.faq : []);
  const [bannerImage, setBannerImage] = useState<string | null>(blog ? blog.bannerImage : null);
  const [category, setCategory] = useState(blog ? blog.category : "");
  const [status, setStatus] = useState(blog ? blog.status === "Published" : false);
  const [readTime, setReadTime] = useState<number | null>(null); // Automatically calculated read time
  const [createdAt] = useState(blog ? blog.createdAt : new Date().toISOString());
  const [categories, setCategories] = useState<any[]>([]); // Categories from localStorage

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    // Automatically calculate and update read time whenever the content changes
    calculateReadTime(content);
  }, [content]);

  // Function to calculate read time based on word count
  const calculateReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).length; // Split content by spaces to get the word count
    const estimatedTime = Math.ceil(words / 200); // 200 words per minute reading speed
    setReadTime(estimatedTime);
  };

  const handleSave = () => {
    const newBlog = {
      id: blog ? blog.id : Date.now(),  // Ensure the blog has an id for both new and updated blogs
      title,
      content,
      faq,
      bannerImage,
      category,
      status: status ? "Published" : "Draft",
      readTime,
      createdAt,
    };

    // Convert image to base64 to store in localStorage
    if (bannerImage && typeof bannerImage === 'object') {
      const reader = new FileReader();
      reader.onloadend = () => {
        newBlog.bannerImage = reader.result as string;
        onSave(newBlog);
      };
      reader.readAsDataURL(bannerImage);
    } else {
      onSave(newBlog);
    }
  };

  const handleAddFaq = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: any = event.target.files[0];
      setBannerImage(file);
    }
  };

  return (
    <div>
      <h3>{blog ? "Edit Blog" : "Add Blog"}</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <ReactQuill className="ReactQuillStyle" value={content} onChange={setContent} />
      </div>

      {/* Displaying Read Time at the top */}
      <div className="form-group">
        <label>Estimated Read Time: {readTime ? `${readTime} min` : "Calculating..."}</label>
      </div>

      {/* Category selection from localStorage */}
      <div className="form-group">
        <label>Category</label>
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>Select category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={status}
            name="status"
            onChange={() => setStatus(!status)}
          />
          <label htmlFor="status" className="form-check-label">{status ? "Published" : "Draft"}</label>
        </div>
      </div>

      <div className="form-group">
        <label>Banner Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleBannerImageChange}
        />
      </div>

      <h4>FAQ Section</h4>
      {faq.map((faqItem: any, index: number) => (
        <div key={index} className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Question"
            value={faqItem.question}
            onChange={(e) => {
              const newFaq = [...faq];
              newFaq[index].question = e.target.value;
              setFaq(newFaq);
            }}
          />
          <ReactQuill
            value={faqItem.answer}
            onChange={(value) => {
              const newFaq = [...faq];
              newFaq[index].answer = value;
              setFaq(newFaq);
            }}
            className="ReactQuillStyle"
          />
        </div>
      ))}
      <button className="btn btn-secondary buttonSenStyle" onClick={handleAddFaq}>Add FAQ</button>

      <div className="form-group mt-4 addBlogStyle">
        <button className="btn btn-success" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary buttonSenStyle" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BlogForm;
