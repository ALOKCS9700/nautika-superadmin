import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const BlogForm: React.FC<{ blog: any | null, onSave: (blog: any) => void, onClose: () => void }> = ({ blog, onSave, onClose }) => {
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [content, setContent] = useState(blog ? blog.content : "");
  const [faq, setFaq] = useState<Array<{ question: string, answer: string }>>(blog && blog.faqs ? blog.faqs : []); // Ensure faq is an array
  const [imageFile, setImageFile] = useState<File | null>(null); // For the image file upload
  const [imageUrl, setImageUrl] = useState<string | null>(blog ? blog.image : null); // For the image URL returned by API
  const [categoryId, setCategoryId] = useState(blog ? blog.categoryId : "");
  const [categoryName, setCategoryName] = useState(blog ? blog.categoryName : "");
  const [status, setStatus] = useState(blog ? blog.status === "Published" : false);
  const [readTime, setReadTime] = useState<number | null>(null); // Automatically calculated read time
  const [createdAt] = useState(blog ? blog.createdAt : new Date().toISOString());
  const [categories, setCategories] = useState<any[]>([]); // Categories from API

  useEffect(() => {
    // Fetch categories from API
    async function fetchCategories() {
      const response = await axios.get("http://localhost:5001/admin/nautika/categories");
      setCategories(response.data);
    }
    fetchCategories();
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

  // Function to upload image and return the URL
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post("http://localhost:5001/admin/intro/upload-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Return the uploaded image URL
      return `http://localhost:5001${response.data.fileUrl}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSave = async () => {
    let finalImageUrl = imageUrl;

    // If a new image is selected, upload it
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        finalImageUrl = uploadedImageUrl; // Update with the uploaded image URL
      }
    }

    const newBlog = {
      _id: blog ? blog._id : undefined,  // Ensure the blog has an id for both new and updated blogs
      title,
      content,
      faqs: faq,
      image: finalImageUrl,  // Use the uploaded image URL
      categoryId,
      categoryName,
      status: status ? "Published" : "Draft",
      readTime,
      createdAt,
    };

    onSave(newBlog);
  };

  const handleAddFaq = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: any = event.target.files[0];
      setImageFile(file); // Set the image file to upload
      setImageUrl(URL.createObjectURL(file)); // Set a temporary URL for preview
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

      {/* Category selection from API */}
      <div className="form-group">
        <label>Category</label>
        <select className="form-control" value={categoryId} onChange={(e) => {
          const selectedCategory = categories.find((cat) => cat._id === e.target.value);
          setCategoryId(selectedCategory._id);
          setCategoryName(selectedCategory.name);
        }}>
          <option value="" disabled>Select category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat._id}>{cat.name}</option>
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
          onChange={handleImageChange}
        />
        {/* {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Banner Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
          </div>
        )} */}
      </div>

      <h4>FAQ Section</h4>
      {faq.length > 0 ? faq.map((faqItem: any, index: number) => (
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
      )) : (
        <p>No FAQs added yet</p>
      )}
      <button className="btn btn-secondary buttonSenStyle" onClick={handleAddFaq}>Add FAQ</button>

      <div className="form-group mt-4 addBlogStyle">
        <button className="btn btn-success" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary buttonSenStyle" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BlogForm;
