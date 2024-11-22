import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Set up axios with baseURL
const api = axios.create({
    baseURL: "http://134.209.156.80:5001/admin/nautika",
});

// Utility function to compress image
const compressImage = (file: File, quality = 0.7): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const result = event && event.target ? event.target.result : null;
            if (result) {
                const img = new Image();
                img.src = result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    const maxWidth = 800;
                    const scaleSize = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleSize;

                    if (ctx) {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const compressedBase64 = canvas.toDataURL("image/jpeg", quality); // Compress and get base64
                        resolve(compressedBase64);
                    } else {
                        reject("Canvas context not available");
                    }
                };
            } else {
                reject("Invalid image");
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

const IslandsCategoryManagement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<any[]>([]);
    const [newCategory, setNewCategory] = useState<{ name: string, description: string, image: string | null }>({
        name: "",
        description: "",
        image: null
    });
    const [editCategory, setEditCategory] = useState<any | null>(null);

    useEffect(() => {
        fetchCategories();
    }, [dispatch]);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handle add/edit category
    const handleAddEditCategory = async () => {
        try {
            if (editCategory) {
                // Update existing category
                await api.put(`/categories/${editCategory._id}`, {
                    name: newCategory.name,
                    description: newCategory.description,
                    categimageoryImage: newCategory.image,
                });
            } else {
                // Create new category
                await api.post("/categories", {
                    name: newCategory.name,
                    description: newCategory.description,
                    image: newCategory.image,
                });
            }
            fetchCategories(); // Refresh the list
            setNewCategory({ name: "", description: "", image: null });
            setEditCategory(null);
        } catch (error) {
            console.error("Error adding/editing category:", error);
        }
    };

    // Handle delete category
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await api.delete(`/categories/${categoryId}`);
            fetchCategories(); // Refresh the list
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Handle edit category
    const handleEditCategory = (category: any) => {
        if (category) {
            setEditCategory(category);
            setNewCategory({ name: category.name, description: category.description, image: category.image });
        }
    };

    // Handle image upload
    const handleCategoryImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                // Compress image before uploading
                const compressedImage = await compressImage(file);

                // Upload compressed image
                const formData = new FormData();
                formData.append("file", file); // Append the original file
                const apiURL = "http://134.209.156.80:5001/admin/intro/upload-image"
                const response = await api.post(apiURL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Set the uploaded image URL
                setNewCategory({ ...newCategory, image: `http://134.209.156.80:5001${response.data.fileUrl}` });
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    };

    return (
        <div>
            <div className="ManageCategoriesBtn">
                <button className="btn btn-secondary buttonSenStyle" onClick={onBack}>Back to Blog List</button>
            </div>

            <div className="form-group mt-4">
                <label>Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Enter category name"
                />
            </div>

            <div className="form-group">
                <label>Category Description</label>
                <textarea
                    className="form-control"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Enter category description"
                />
            </div>

            <div className="form-group">
                <label>Category Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleCategoryImageChange} />
            </div>

            <div className="form-group">
                <button className="btn btn-success" onClick={handleAddEditCategory}>
                    {editCategory ? "Update Category" : "Add Category"}
                </button>
                {editCategory && (
                    <button className="btn btn-secondary ml-2 buttonSenStyle" onClick={() => {
                        setEditCategory(null);
                        setNewCategory({ name: "", description: "", image: null });
                    }}>
                        Cancel Edit
                    </button>
                )}
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {categories.length > 0 && (
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {category.image ? <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px' }} /> : "No Image"}
                                </td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td className="listItemStyle">
                                    <button className="btn btn-warning mr-2" onClick={() => handleEditCategory(category)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}

            </table>
        </div>
    );
};

export default IslandsCategoryManagement;
