import axios from "axios";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { addNotification } from "../../store/actions/notifications.action";

const formats = [
  "header", "height", "bold", "italic", "underline", "strike",
  "blockquote", "list", "color", "bullet", "indent", "link",
  "image", "align", "size", 'table',
];

const IslandsManagementForm: React.FC<{
  blog: any | null;
  onSave: (blog: any) => void;
  onClose: () => void;
}> = ({ blog, onSave, onClose }) => {
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [slug, setSlug] = useState(blog ? blog.slug : "");
  const [shortDescription, setShortDescription] = useState(blog ? blog.extra_content : "");
  console.log("blogblogblogblogblog", blog)
  const [AboutDescription, setAboutDescription] = useState(blog ? blog.about : "");
  const [tags, setTags] = useState(blog ? blog.tags : "");
  const [thingstodo, setThingstodo] = useState(blog && Array.isArray(blog.things_to_do) ? blog.things_to_do.toString() : "");

  // const [content, setContent] = useState(blog ? blog.content : "");
  const [bestTime, setBestTime] = useState(blog ? blog.best_time : "");
  const [faq, setFaq] = useState<Array<{ name: any; content: any, image?: any, _id: any }>>(
    blog && blog.popular_beaches ? blog.popular_beaches : []
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    blog ? blog.cover_image : null
  );
  const [images, setImages] = useState<string | null>(
    blog ? blog.images : null
  );
  const [imageFiles, setImageFiles] = useState<File[]>(blog ? blog.images : []);
  const [categoryId, setCategoryId] = useState(blog ? blog.categoryId : "");
  const [categoryName, setCategoryName] = useState(
    blog ? blog.categoryName : ""
  );
  const [status, setStatus] = useState(blog ? blog.status === "Published" : false);
  const [selectedOption, setSelectedOption] = useState("Island Pages"); // Track the selected option
  // const [readTime, setReadTime] = useState<number | null>(null);
  const [createdAt] = useState(blog ? blog.createdAt : new Date().toISOString());
  const [categories, setCategories] = useState<any[]>([]);
  const [YoutubeVideoURl, setYoutubeVideoURl] = useState(blog ? blog.videoUrl : "" as any);
  const [metaTitle, setmetaTitle] = useState(blog ? blog.meta.title : "" as any);
  const [metaDescription, setmetaDescription] = useState(blog ? blog.meta.description : "" as any);
  // const [metaKeywords, setmetaKeywords] = useState(blog ? blog.metaKeywords : "" as any);
  const quillRef: any = useRef<ReactQuill | null>(null);
  const dispatch: Dispatch<any> = useDispatch();

  // Custom image handler
  const imageHandler = () => {
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imgAlt = prompt('Enter alt text for the image');
        const imageUrl = reader.result;

        // Access the Quill editor instance using the ref
        const quill = quillRef.current.getEditor();
        if (quill) {
          const range: any = quill.getSelection();
          const image = `<img src="${imageUrl}" alt="${imgAlt}" />`;
          // Insert image with alt text
          quill.clipboard.dangerouslyPasteHTML(range.index, image);
        }
      };

      reader.readAsDataURL(file);
    };
  };

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
      // ["link",{ 'image': imageHandler }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ],

  };



  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(
        "http://134.209.156.80:5001/admin/nautika/categories"
      );
      setCategories(response.data.categories);
    }
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   if (content !== "") {
  //     calculateReadTime(content);
  //   }
  // }, [content]);

  // const calculateReadTime = (text: string) => {
  //   const words = text.trim().split(/\s+/).length;
  //   const estimatedTime = Math.ceil(words / 200);
  //   setReadTime(estimatedTime);
  // };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://134.209.156.80:5001/admin/intro/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = `http://134.209.156.80:5001${response.data.fileUrl}`;
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

  const handleImagePopularBeaches = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await uploadImage(file); // Upload image and get URL
        const newFaq = [...faq];
        newFaq[index].image = imageUrl; // Update image URL in FAQ item
        setFaq(newFaq); // Update FAQ state
      }
    }
  };

  const handleSave = async () => {
    const tagsArray = tags.split(",").map((tag: any) => tag.trim());
    const things_to_doArry = thingstodo.split(",").map((tag: any) => tag.trim());
    const newBlog = {
      _id: blog ? blog._id : undefined,
      title,
      about: AboutDescription,
      popular_beaches: faq,
      cover_image: imageUrl,
      best_time: bestTime,
      images: imageFiles,
      createdAt,
      meta: {
        title: metaTitle,
        description: metaDescription
      },
      extra_content: shortDescription,
      tags: tags,
      // tags: tagsArray,
      things_to_do: things_to_doArry,
      slug,
    };
    console.log("newBlognewBlognewBlognewBlog", newBlog)
    if (tags !== "" || shortDescription !== "" || imageFiles.length > 0) {
      onSave(newBlog);
    } else {
      dispatch(addNotification("Required Fields", `All Fields are required`));
    }
  };

  const handleAddFaq = () => {
    setFaq([...faq, { name: "", content: "", image: "", _id: "" }]);
  };

  // Handle file selection and upload multiple files
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Convert FileList to an array
      const uploadedImages = await Promise.all(filesArray.map(uploadImage)); // Upload each file
      setImageFiles((prevImages: any) => [...prevImages, ...uploadedImages]); // Append new images to the state
    }
  };

  return (
    <div>
      <div className="blogAddModalWithBack">
        <i onClick={onClose} className="fas fa-arrow-left"></i>
        <h3>{blog ? "Edit Islands" : "Add Islands"}</h3>
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter islands title"
        />
      </div>

      <div className="form-group">
        <label>Cover Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="muliImageStyleBox">
        {imageUrl && (
          <img src={imageUrl} alt="Cover Image" width={50} style={{ marginRight: '5px' }} />
        )}
      </div>

      <div className="form-group">
        <label>Images</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div className="muliImageStyleBox">
        {imageFiles.map((img: any, index: any) => (
          <img
            key={index}
            src={img}
            alt={`Images ${index}`}
            width={50}
            style={{ marginRight: "5px" }}
          />
        ))}
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
      {/* <div className="form-group">
        <label>Meta Keywords</label>
        <input
          type="text"
          className="form-control"
          value={metaKeywords}
          onChange={(e: any) => setmetaKeywords(e.target.value)}
          placeholder="Enter Meta Keywords"
        />
      </div> */}
      <div className="form-group">
        <label>Best Time</label>
        <input
          type="text"
          className="form-control"
          value={bestTime}
          onChange={(e: any) => setBestTime(e.target.value)}
          placeholder="Enter Best Time"
        />
      </div>

      <div className="form-group">
        <label>Things To Do</label>
        <input
          type="text"
          className="form-control"
          value={thingstodo}
          onChange={(e: any) => setThingstodo(e.target.value)}
          placeholder="Enter Things To Do"
        />
      </div>

      <div className="form-group">
        <label>Extra Content</label>
        <textarea
          className="form-control"
          value={shortDescription}
          onChange={(e: any) => setShortDescription(e.target.value)}
          placeholder="Enter Extra Content"
          rows={4} // Adjust rows for height as needed
        />
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          className="form-control"
          value={tags}
          onChange={(e: any) => setTags(e.target.value)}
          placeholder="Enter tags"
        />
      </div>

      <div className="form-group">
        <label>Slug</label>
        <input
          type="text"
          className="form-control"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
          placeholder="Enter Slug"
        />
      </div>

      <div className="form-group">
        <label>About</label>
        <textarea
          className="form-control"
          value={AboutDescription}
          onChange={(e: any) => setAboutDescription(e.target.value)}
          placeholder="Enter About"
          rows={4} // Adjust rows for height as needed
        />
      </div>

      <h4>Popular Beaches</h4>
      {faq.length > 0 ? (
        faq.map((faqItem, index) => (
          <div key={index} className="form-group FAQblogAddReactQuill">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={faqItem.name}
                onChange={(e: any) => {
                  const newFaq = [...faq];
                  newFaq[index].name = e.target.value;
                  setFaq(newFaq);
                }}
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                className="form-control"
                value={faqItem.content}
                onChange={(e: any) => {
                  const newFaq = [...faq];
                  newFaq[index].content = e.target.value;
                  setFaq(newFaq);
                }}
                placeholder="Enter Content"
                rows={4} // Adjust rows for height as needed
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handleImagePopularBeaches(e, index)} // Pass index to handleImageChange
              />
            </div>
            <div className="muliImageStyleBox">
              {faqItem.image && (
                <img src={faqItem.image} alt="Uploaded" width={50} style={{ marginRight: '5px' }} />
              )}
            </div>

          </div>
        ))
      ) : (
        <p>No Popular Beaches added yet</p>
      )}
      <button className="btn btn-secondary buttonSenStyle" onClick={handleAddFaq}>
        Add Popular Beaches
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

export default IslandsManagementForm;
