import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = [
  "header", "height", "bold", "italic", "underline", "strike",
  "blockquote", "list", "color", "bullet", "indent", "link",
  "image", "align", "size", 'table',
];

const BlogForm: React.FC<{
  blog: any | null;
  onSave: (blog: any) => void;
  onClose: () => void;
}> = ({ blog, onSave, onClose }) => {
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [content, setContent] = useState(blog ? blog.content : "");
  const [faq, setFaq] = useState<Array<{ question: string; answer: string }>>(
    blog && blog.faqs ? blog.faqs : []
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    blog ? blog.image : null
  );
  const [categoryId, setCategoryId] = useState(blog ? blog.categoryId : "");
  const [categoryName, setCategoryName] = useState(
    blog ? blog.categoryName : ""
  );
  const [status, setStatus] = useState(blog ? blog.status === "Published" : false);
  const [readTime, setReadTime] = useState<number | null>(null);
  const [createdAt] = useState(blog ? blog.createdAt : new Date().toISOString());
  const [categories, setCategories] = useState<any[]>([]);
  const [YoutubeVideoURl, setYoutubeVideoURl] = useState(blog ? blog.videoUrl : "" as any);
  const [metaTitle, setmetaTitle] = useState(blog ? blog.metaTitle : "" as any);
  const [metaDescription, setmetaDescription] = useState(blog ? blog.metaDescription : "" as any);
  const [metaKeywords, setmetaKeywords] = useState(blog ? blog.metaKeywords : "" as any);
  const quillRef = useRef<ReactQuill | null>(null);

  const QuillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      [
        {
          color: [
            "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc",
            "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc",
            "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66",
            "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00",
            "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000",
            "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'
          ],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ],
    
  };



  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(
        "https://oglitz-backend-node.onrender.com/admin/nautika/categories"
      );
      setCategories(response.data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    calculateReadTime(content);
  }, [content]);

  const calculateReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const estimatedTime = Math.ceil(words / 200);
    setReadTime(estimatedTime);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://oglitz-backend-node.onrender.com/admin/intro/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = `https://oglitz-backend-node.onrender.com${response.data.fileUrl}`;
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };



  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const uploadedImageUrl = await uploadImage(file);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
      }
    }
  };

  const handleSave = () => {
    const newBlog = {
      _id: blog ? blog._id : undefined,
      title,
      content,
      faqs: faq,
      image: imageUrl,
      categoryId,
      categoryName,
      status: status ? "Published" : "Draft",
      readTime,
      createdAt,
      videoUrl: YoutubeVideoURl,
      metaTitle,
      metaDescription,
      metaKeywords,
    };
    onSave(newBlog);
  };

  const handleAddFaq = () => {
    setFaq([...faq, { question: "", answer: "" }]);
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
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={QuillModules}
          formats={formats}
          placeholder="write here...."
        />
      </div>

      <div className="form-group">
        <label>Estimated Read Time: {readTime ? `${readTime} min` : "Calculating..."}</label>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => {
            const selectedCategory = categories.find(
              (cat) => cat._id === e.target.value
            );
            setCategoryId(selectedCategory._id);
            setCategoryName(selectedCategory.name);
          }}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat._id}>
              {cat.name}
            </option>
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
          <label htmlFor="status" className="form-check-label">
            {status ? "Published" : "Draft"}
          </label>
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
      
      </div>
      <div className="form-group">
        <label>YouTube Video URL</label>
        <input
          type="text"
          className="form-control"
          value={YoutubeVideoURl}
          onChange={(e: any) => setYoutubeVideoURl(e.target.value)}
          placeholder="Enter YouTube Video URL"
        />
      </div>
      <div className="form-group">
        <label>Meta Title</label>
        <input
          type="text"
          className="form-control"
          value={metaTitle}
          onChange={(e: any) => setmetaTitle(e.target.value)}
          placeholder="Enter Meta Title"
        />
      </div>
      <div className="form-group">
        <label>Meta Description</label>
        <input
          type="text"
          className="form-control"
          value={metaDescription}
          onChange={(e: any) => setmetaDescription(e.target.value)}
          placeholder="Enter Meta Description"
        />
      </div>
      <div className="form-group">
        <label>Meta Keywords</label>
        <input
          type="text"
          className="form-control"
          value={metaKeywords}
          onChange={(e: any) => setmetaKeywords(e.target.value)}
          placeholder="Enter Meta Keywords"
        />
      </div>

      <h4>FAQ Section</h4>
      {faq.length > 0 ? (
        faq.map((faqItem, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              className="form-control faqQuestionStyle"
              placeholder="Question"
              value={faqItem.question}
              onChange={(e) => {
                const newFaq = [...faq];
                newFaq[index].question = e.target.value;
                setFaq(newFaq);
              }}
            />
            <ReactQuill
              className="ReactQuillStyle"
              value={faqItem.answer}
              onChange={(value) => {
                const newFaq = [...faq];
                newFaq[index].answer = value;
                setFaq(newFaq);
              }}
              modules={QuillModules}
              formats={formats}
              placeholder="write here...."
            />
          </div>
        ))
      ) : (
        <p>No FAQs added yet</p>
      )}
      <button className="btn btn-secondary buttonSenStyle" onClick={handleAddFaq}>
        Add FAQ
      </button>

      <div className="form-group mt-4 addBlogStyle">
        <button className="btn btn-success " onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary buttonSenStyle" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
