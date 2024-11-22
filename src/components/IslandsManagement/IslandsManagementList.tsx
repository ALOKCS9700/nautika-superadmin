import React from "react";
import { useHistory } from "react-router-dom";

const IslandsManagementList: React.FC<{
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
            <th>Cover Image</th>
            <th>Title</th>
            <th>About</th>
            <th>Best Time</th>
            <th>Tags</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>
                {blog.cover_image ? (
                  <img src={blog.cover_image} alt={blog.title} style={{ width: '50px', height: '50px' }} />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{blog.title}</td>
              {/* <td>{blog.about || "No About"}</td> */}
              <td>
                {
                  blog.about && blog.about.length > 15
                    ? blog.about.substring(0, 15) + "..."
                    : blog.about || "No About"
                }
              </td>

              <td>{blog.best_time ? `${blog.best_time}` : "N/A"}</td>
              {blog.tags ? (
                <td>{blog.tags.toString() || "Draft"}</td>
              ) : (
                <td>No Tags</td>
              )}
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="listItemStyle">
                <button className="btn btn-warning" onClick={() => onEdit(blog)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(blog._id)}>Delete</button>
                {/* <button className="btn btn-info" onClick={() => handleView(blog._id)}>View Blog</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IslandsManagementList;
