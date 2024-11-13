import React from "react";
import { useHistory } from "react-router-dom";

const BlogList: React.FC<{
  blogs: any[],
  onEdit: (blog: any) => void,
  onDelete: (blogId: string) => void
}> = ({ blogs, onEdit, onDelete }) => {
  const history = useHistory();

  const handleView = (blogId: string) => {
    history.push(`/view-blog/${blogId}`);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Read Time</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} style={{ width: '50px', height: '50px' }} />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{blog.title}</td>
              <td>{blog.categoryName || "Uncategorized"}</td>
              <td>{blog.readTime ? `${blog.readTime} min` : "N/A"}</td>
              <td>{blog.status || "Draft"}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="listItemStyle">
                <button className="btn btn-warning" onClick={() => onEdit(blog)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(blog._id)}>Delete</button>
                <button className="btn btn-info" onClick={() => handleView(blog._id)}>View Blog</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
