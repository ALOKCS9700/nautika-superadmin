import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import CategoryManagement from "./CategoryManagement";
import Popup from "reactjs-popup";
import "./BlogManagement.css";
import BlogList from "./BlogManagementList";
import BlogForm from "./BlogManagementForm";
import { getFromLocalStorage, saveToLocalStorage } from "../../common/components/CommonFunction";

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>(getFromLocalStorage('blogs'));
  const [categories, setCategories] = useState<any[]>(getFromLocalStorage('categories'));
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [showCategoryPage, setShowCategoryPage] = useState(false);
  const [popup, setPopup] = useState(false);

  const totalBlogs = blogs.length;
  const totalCategories = categories.length;

  useEffect(() => {
    // Load from localStorage when component mounts
    setBlogs(getFromLocalStorage('blogs'));
    setCategories(getFromLocalStorage('categories'));
  }, []);

  const handleBlogSelect = (blog: any) => {
    setSelectedBlog(blog);
    setPopup(true);
  };

  const handleBlogSave = (newBlog: any) => {
    let updatedBlogs;
    if (selectedBlog && selectedBlog.id) {
      // Edit existing blog
      updatedBlogs = blogs.map(blog => blog.id === selectedBlog.id ? newBlog : blog);
    } else {
      // Add new blog
      newBlog.id = Date.now();
      updatedBlogs = [...blogs, newBlog];
    }
    setBlogs(updatedBlogs);
    saveToLocalStorage('blogs', updatedBlogs);
    setPopup(false);
  };

  const handleBlogDelete = (blogId: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
    setBlogs(updatedBlogs);
    saveToLocalStorage('blogs', updatedBlogs);
  };

  const handleCategoryPageToggle = () => setShowCategoryPage(!showCategoryPage);

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800"> {showCategoryPage ? "Category Management" : "Blogs Management"}</h1>
      <div className="row">
        <TopCard title="Total Blogs" text={`${totalBlogs}`} icon="book" class="primary" />
        <TopCard title="Total Categories" text={`${totalCategories}`} icon="list" class="info" />
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
                    setSelectedBlog(null)
                    setPopup(true)
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
