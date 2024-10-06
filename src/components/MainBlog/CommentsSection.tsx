import React, { useEffect, useState } from 'react';

const formatCommentDate = (dateString: string) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInMs = now.getTime() - commentDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} inute(s) ago`;
    if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
    if (diffInDays < 30) return `${diffInDays} day(s) ago`;
    if (diffInMonths < 12) return `${diffInMonths} month(s) ago`;
    return `${diffInYears} year(s) ago`;
};

const CommentSection = ({ blogId }: { blogId: string }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [editUserInfo, setEditUserInfo] = useState(false); // To toggle user info edit form

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem(`comments-${blogId}`) || '[]');
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

        if (storedUserInfo.name) {
            setName(storedUserInfo.name);
            setEmail(storedUserInfo.email);
        }

        setComments(storedComments);
    }, [blogId]);

    // Add an interval to refresh the timestamps every 1 minute
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Simply trigger a re-render by updating the state (comments stay the same)
            setComments((prevComments) => [...prevComments]);
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newComment = {
            name,
            email,
            text: comment,
            date: new Date(),
        };

        // Save user info for future comments
        if (!localStorage.getItem('userInfo')) {
            localStorage.setItem('userInfo', JSON.stringify({ name, email }));
        }

        // Save comment in localStorage specific to the blogId
        const updatedComments = [newComment, ...comments]; // Prepend the new comment
        localStorage.setItem(`comments-${blogId}`, JSON.stringify(updatedComments));
        setComments(updatedComments);

        // Clear comment field after submission
        setComment('');
    };

    const handleUserInfoUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        // Update user info in localStorage
        localStorage.setItem('userInfo', JSON.stringify({ name, email }));
        setEditUserInfo(false); // Hide the form after updating
    };

    const getRandomColor = (name: string) => {
        const letters = '0123456789ABCDEF';
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.abs(hash) % 16];
            hash = Math.floor(hash / 16);
        }
        return color;
    };

    return (
        <div className="comments-section">
            <h2>Comments
                {localStorage.getItem('userInfo') && (
                    <span
                        onClick={() => setEditUserInfo(true)}
                        className="edit-user-info"
                    >
                        Edit User Info
                    </span>
                )}
            </h2>
            {/* {localStorage.getItem('userInfo') && (
                <button onClick={() => setEditUserInfo(true)} className="edit-user-info-button">
                    Edit User Info
                </button>
            )} */}

            {editUserInfo && (
                <form onSubmit={handleUserInfoUpdate} className="edit-user-info-form">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="UpdateAndCancelBtn">
                        <button type="submit">Update Info</button>
                        <button className='CancelEditInfoStyle' onClick={() => setEditUserInfo(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <form onSubmit={handleCommentSubmit}>
                {!localStorage.getItem('userInfo') && (
                    <>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </>
                )}
                <div>
                    <label>Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <div className="comments-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                        <div
                            className="comment-avatar"
                            style={{ backgroundColor: getRandomColor(comment.name) }}
                        >
                            {comment.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="comment-content">
                            <p className="comment-name">{comment.name}</p>
                            <p className="comment-date">{formatCommentDate(comment.date)}</p>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
