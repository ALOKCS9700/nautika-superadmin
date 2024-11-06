import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCard";
import "./BlogManagement.css";
import BlogForm from "./BlogManagementForm";
import BlogList from "./BlogManagementList";
import CategoryManagement from "./CategoryManagement";
import { addNotification } from "../../store/actions/notifications.action";
import { useDispatch } from "react-redux";

const api = axios.create({
  baseURL: "https://cms-backend-ftz7.onrender.com/admin/nautika", // Base API URL
});

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [showCategoryPage, setShowCategoryPage] = useState(false);
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch blogs and categories from API when component mounts
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleBlogSave = async (newBlog: any) => {
    try {
      if (selectedBlog && selectedBlog._id) {
        // Update existing blog
        await api.put(`/blogs/${selectedBlog._id}`, newBlog);
      } else {
        // Create new blog
        await api.post("/blogs", newBlog);
      }
      fetchBlogs(); // Refresh the list after save
      setPopup(false);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleBlogDelete = async (blogId: string) => {
    try {
      await api.delete(`/blogs/${blogId}`);
      fetchBlogs(); // Refresh the list after delete
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleBlogSelect = (blog: any) => {
    setSelectedBlog(blog);
    setPopup(true);
  };

  const handleCategoryPageToggle = () => setShowCategoryPage(!showCategoryPage);

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">{showCategoryPage ? "Category Management" : "Blogs Management"}</h1>
      <div className="row">
        <TopCard title="Total Blogs" text={`${blogs.length}`} icon="book" class="primary" />
        <TopCard title="Total Categories" text={`${categories.length || 0}`} icon="list" class="info" />
      </div>

      {showCategoryPage ? (
        <CategoryManagement onBack={handleCategoryPageToggle} />
      ) : (
        <Fragment>
          <div className="row ManageCategoriesBtn">
            <button className="btn btn-secondary buttonSenStyle" onClick={handleCategoryPageToggle}>
              Manage Categories
            </button>
          </div>
          <div className="row mt-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 headingWithButtonStyle">
                  <h6 className="m-0 font-weight-bold text-green">Blog List</h6>
                  <button className="btn btn-success" onClick={() => {
                    if (categories.length > 0) {
                      setSelectedBlog(null);
                      setPopup(true);
                    } else {
                      dispatch(addNotification("Category Not Found", ` Please create atleast one category for Blog`));
                    }
                  }}>
                    Add New Blog
                  </button>
                </div>
                <div className="card-body">
                  <BlogList blogs={blogs} onEdit={handleBlogSelect} onDelete={handleBlogDelete} />
                </div>
              </div>
            </div>
          </div>

          <Popup open={popup} onClose={() => setPopup(false)} closeOnDocumentClick>
            <BlogForm blog={selectedBlog} onSave={handleBlogSave} onClose={() => setPopup(false)} />
          </Popup>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogManagement;
