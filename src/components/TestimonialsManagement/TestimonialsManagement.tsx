import axios from "axios";
import React, { useEffect, useState } from "react";
import TopCard from "../../common/components/TopCard";
import "./TestimonialsManagement.css";

// Define the base API URLs for testimonials
const api = axios.create({
    baseURL: "http://134.209.156.80:5001/api/nautika/testimonials",
});
const api2 = axios.create({
    baseURL: "http://134.209.156.80:5001/admin/nautika/testimonials",
});

const TestimonialsManagement = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        type: "video",
        coverImage: "",
        text: "",
        name: "",
        video_url: "",
        dateCreated: "",
    });
    const [selectedOption, setSelectedOption] = useState("video");

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Fetch all testimonials from the API
    const fetchTestimonials = async () => {
        try {
            const response = await api.get("/");
            setTestimonials(response.data.testimonials);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

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
                setFormData({ ...formData, coverImage: uploadedImageUrl });
            }
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Show the form for adding a new testimonial
    const handleAddNew = () => {
        setFormVisible(true);
        setFormData({
            type: "video",
            coverImage: "",
            text: "",
            name: "",
            video_url: "",
            dateCreated: new Date().toISOString().split("T")[0],
        });
        setSelectedTestimonial(null);
    };

    // Edit an existing testimonial
    const handleEdit = (testimonial: any) => {
        setSelectedTestimonial(testimonial);
        setFormData(testimonial);
        setFormVisible(true);
    };

    // Save a new or edited testimonial
    const handleSave = async () => {
        try {
            if (selectedTestimonial) {
                await api2.put(`/${selectedTestimonial._id}`, formData);
            } else {
                await api2.post("/", formData);
            }
            fetchTestimonials();
            setFormVisible(false);
            setSelectedTestimonial(null);
        } catch (error) {
            console.error("Error saving testimonial:", error);
        }
    };

    // Delete a testimonial
    const handleDelete = async (id: string) => {
        try {
            await api2.delete(`/${id}`);
            fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
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

    return (
        <div className="testimonials-management">
            <h1 className="h3 mb-2 text-gray-800">Testimonials Management</h1>
            <div className="row">
                <TopCard title="Total Testimonials" text={`${testimonials.length}`} icon="star" class="primary" />
            </div>
            <button onClick={handleAddNew} className="add-button btn btn-success">Add New Testimonial</button>

            {formVisible && (
                <div className="testimonial-form">
                    <h3>{selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <div className="BlogTopRadioStyleBox">
                        <div className="form-group BlogStatusFlex BlogTopRadioStyle">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input form-check-inputTop"
                                    checked={formData.type === "video"}
                                    name="blogOption"
                                    onChange={() => setFormData({ ...formData, type: "video" })}
                                    id="video"
                                />
                                <label htmlFor="video" className="form-check-label">
                                    Video
                                </label>
                            </div>
                        </div>
                        <div className="form-group BlogStatusFlex BlogTopRadioStyle">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input form-check-inputTop"
                                    checked={formData.type === "image"}
                                    name="blogOption"
                                    onChange={() => setFormData({ ...formData, type: "image" })}
                                    id="imageCheck"
                                />
                                <label htmlFor="imageCheck" className="form-check-label">
                                    Image
                                </label>
                            </div>
                        </div>
                        <div className="form-group BlogStatusFlex BlogTopRadioStyle">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input form-check-inputTop"
                                    checked={formData.type === "text"}
                                    name="blogOption"
                                    onChange={() => setFormData({ ...formData, type: "text" })}
                                    id="textCheck"
                                />
                                <label htmlFor="textCheck" className="form-check-label">
                                    Text
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="videoandInputVideoURl">
                        <input
                            type="file"
                            name="coverImage"
                            placeholder="Cover Image URL"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {formData.coverImage && (
                            <img src={formData.coverImage} alt="" className="videoPreview" />
                        )}
                    </div>
                    <textarea
                        name="text"
                        placeholder="Testimonial Text"
                        value={formData.text}
                        onChange={handleInputChange}
                    />
                    <div className="videoandInputVideoURl">
                        <input
                            type="text"
                            name="video_url"
                            placeholder="Video URL"
                            value={formData.video_url}
                            onChange={handleInputChange}
                        />
                        {formData.video_url && (
                            <iframe className="videoPreview" src={getValidVideoUrl(formData.video_url)} frameBorder="0" ></iframe>
                        )}
                    </div>
                    {/* <input
                        type="date"
                        name="dateCreated"
                        value={formData.dateCreated}
                        onChange={handleInputChange}
                        disabled
                        readOnly
                    /> */}
                    <div className="twoBtnStyle">
                        <button onClick={handleSave} className="save-button">Save</button>
                        <button onClick={() => setFormVisible(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            )}

            <table className="testimonials-table">
                <thead>
                    <tr>

                        <th>#</th>
                        <th>Name</th>
                        {/* <th>Type</th> */}
                        <th>Text</th>
                        <th>Cover Image</th>
                        <th>Video URL</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial: any, i: any) => (
                        <tr key={testimonial._id}>
                            <td>{i + 1}</td>
                            <td>{testimonial.name}</td>
                            {/* <td>{testimonial.type}</td> */}
                            {/* <td>{testimonial.text}</td> */}
                            <td>
                                {
                                    testimonial.text && testimonial.text.length > 20
                                        ? testimonial.text.substring(0, 20) + "..."
                                        : testimonial.text || "No Testimonial Text"
                                }
                            </td>

                            <td>
                                <img src={testimonial.coverImage} alt="Cover" className="cover-image" />
                            </td>
                            <td><iframe src={getValidVideoUrl(testimonial.video_url)} frameBorder="0" width="85" height="85"></iframe></td>
                            <td>{new Date(testimonial.dateCreated).toISOString().split("T")[0]}</td>
                            <td>
                                <button onClick={() => handleEdit(testimonial)} className="edit-button btn btn-warning">Edit</button>
                                <button onClick={() => handleDelete(testimonial._id)} className="delete-button btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestimonialsManagement;
