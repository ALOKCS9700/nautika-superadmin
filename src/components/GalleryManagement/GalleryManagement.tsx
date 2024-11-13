import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GalleryManagement.css";
import TopCard from "../../common/components/TopCard";
import { useDispatch } from "react-redux";

// Define the base API URLs for the gallery
const api = axios.create({
    baseURL: "http://134.209.156.80:5001/api/nautika/galleries",
});
const api2 = axios.create({
    baseURL: "http://134.209.156.80:5001/admin/nautika/galleries",
});
const uploadApi = axios.create({
    baseURL: "http://134.209.156.80:5001/admin/intro",
});

const GalleryManagement = () => {
    const dispatch = useDispatch();
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        id: null, // For editing an item
        title: "",
        images: [],
        video_url: "",
        coverImage: "",
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [popup, setPopup] = useState(false);
    const [DeleteItem, setDeleteItem] = useState([] as any);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    // Fetch all gallery items from the API
    const fetchGalleryItems = async () => {
        try {
            const response = await api.get("/");
            setGalleryItems(response.data.galleries);
        } catch (error) {
            console.error("Error fetching gallery items:", error);
        }
    };

    // Upload a single image file and return its URL
    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await uploadApi.post("/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return `http://134.209.156.80:5001${response.data.fileUrl}`;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    // Handle form submission for adding or updating gallery items
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const uploadedImages = await Promise.all(imageFiles.map(uploadImage));
            const uploadedCoverImage = coverImageFile ? await uploadImage(coverImageFile) : formData.coverImage;
            const payload = {
                ...formData,
                images: uploadedImages,
                coverImage: uploadedCoverImage,
            };

            if (formData.id) {
                // Update existing item
                await api2.put(`/${formData.id}`, payload);
            } else {
                // Create new item
                await api2.post("/", payload);
            }

            fetchGalleryItems();
            resetForm();
        } catch (error) {
            console.error("Error saving gallery item:", error);
        }
    };

    // Handle delete action
    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await api2.delete(`/${id}`);
            fetchGalleryItems();
        }
    };
    const handleDeletePop = async (item: any) => {
        setPopup(true);
        setDeleteItem(item);
    };

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Reset form data
    const resetForm = () => {
        setSelectedTestimonial(null);
        setFormData({
            id: null,
            title: "",
            images: [],
            video_url: "",
            coverImage: "",
        });
        setImageFiles([]);
        setCoverImageFile(null);
        setFormVisible(false);
    };

    // Handle file selection for images and cover image
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCoverImageFile(e.target.files[0]);
        }
    };

    // Edit an existing gallery item
    const handleEdit = (item: any) => {
        setSelectedTestimonial(item);
        setFormData({
            id: item._id,
            title: item.title,
            images: item.images,
            video_url: item.video_url,
            coverImage: item.coverImage,
        });
        setFormVisible(true);
    };

    const getValidVideoUrl = (url: string): string => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&]+)/;
        const match = url.match(youtubeRegex);

        if (match && match[5]) {
            const videoId = match[5];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // If not a YouTube URL, return the original URL
        return url;
    };

    const handleAddNew = () => {
        setSelectedTestimonial(null);
        setFormData({
            id: null,
            title: "",
            images: [],
            video_url: "",
            coverImage: "",
        });
        setImageFiles([]);
        setCoverImageFile(null);
        setFormVisible(true);
    };


    return (
        <>
            <div className="gallery-management">
                <h1 className="h3 mb-2 text-gray-800">Gallery Management</h1>
                <div className="row">
                    <TopCard title="Total Gallery" text={`${galleryItems.length}`} icon="image" class="primary" />
                </div>
                <button onClick={handleAddNew} className="add-button btn btn-success">Add New Gallery Item</button>
                {formVisible && (
                    <form className="gallery-form">
                        <h3>{selectedTestimonial ? "Edit Gallery Item" : "Add Gallery Item"}</h3>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Title"
                        />

                        <label>Images:</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <div className="muliImageStyleBox">
                            {formData.images.map((img: string, index: number) => (
                                <img key={index} src={img} alt={`Gallery ${index}`} width={50} style={{ marginRight: '5px' }} />
                            ))}
                        </div>
                        <label>Cover Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                        />
                        {formData.coverImage && (
                            <img src={formData.coverImage} alt="" className="videoPreview" />
                        )}
                        <label>Video URL:</label>
                        <input
                            type="url"
                            name="video_url"
                            value={formData.video_url}
                            onChange={handleChange}
                            placeholder="Video URL"
                        />
                        {formData.video_url && (
                            <iframe className="videoPreview" src={getValidVideoUrl(formData.video_url)} frameBorder="0" ></iframe>
                        )}
                        <div className="twoBtnStyle">
                            <button onClick={(e: any) => handleSubmit(e)} className="save-button">Save</button>
                            <button onClick={resetForm} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                )}

                <table className="gallery-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Cover Image</th>
                            <th>Images</th>
                            <th>Video URL</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryItems.map((item, i) => (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <img src={item.coverImage} alt={item.title} width={50} />
                                </td>
                                <td>
                                    {item.images.map((img: string, index: number) => (
                                        <img key={index} src={img} alt={`Gallery ${index}`} width={50} style={{ marginRight: '5px' }} />
                                    ))}
                                </td>
                                <td><iframe src={getValidVideoUrl(item.video_url)} frameBorder="0" width="85" height="85"></iframe></td>
                                <td>{new Date(item.dateCreated).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit-button btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="delete-button btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            
        </>
    );
};

export default GalleryManagement;
