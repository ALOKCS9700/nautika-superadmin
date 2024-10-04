import React, { useState, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../common/components/CommonFunction";
import { useDispatch } from "react-redux";

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

const CategoryManagement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<any[]>(getFromLocalStorage('categories') || []);
    const [newCategory, setNewCategory] = useState<{ name: string, description: string, image: string | null }>({
        name: "",
        description: "",
        image: null
    });
    const [editCategory, setEditCategory] = useState<any | null>(null);

    useEffect(() => {
        const savedCategories = getFromLocalStorage('categories');
        if (savedCategories) {
            setCategories(savedCategories);
        }
    }, [dispatch]);

    const handleAddEditCategory = () => {
        const updatedCategories = [...categories];
        const newCategoryCopy = { ...newCategory };

        if (editCategory) {
            // Edit existing category
            const index = updatedCategories.findIndex(cat => cat.id === editCategory.id);
            if (index !== -1) {
                updatedCategories[index] = { ...editCategory, ...newCategoryCopy };
            }
        } else {
            // Add new category
            const newCategoryWithId = { ...newCategoryCopy, id: Date.now() };
            updatedCategories.push(newCategoryWithId);
        }

        // Save categories to localStorage
        saveToLocalStorage('categories', updatedCategories);
        setCategories(updatedCategories);
        setNewCategory({ name: "", description: "", image: null });
        setEditCategory(null);
    };

    const handleDeleteCategory = (categoryId: string) => {
        const updatedCategories = categories.filter(cat => cat.id !== categoryId);
        setCategories(updatedCategories);
        saveToLocalStorage('categories', updatedCategories);
    };

    const handleEditCategory = (category: any) => {
        if (category) {
            setEditCategory(category);
            setNewCategory({ name: category.name, description: category.description, image: category.image });
        }
    };

    const handleCategoryImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                const compressedImage = await compressImage(file); // Compress image before saving
                setNewCategory({ ...newCategory, image: compressedImage });
            } catch (error) {
                console.error("Error compressing image", error);
            }
        }
    };

    return (
        <div>
            {/* <h3>Category Management</h3> */}
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
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>
                                {category.image ? <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px' }} /> : "No Image"}
                            </td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td className="listItemStyle">
                                <button className="btn btn-warning mr-2" onClick={() => handleEditCategory(category)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManagement;
