import React from 'react';

const MetaInfo = ({ data }: any) => {
    // Data to display
    // const data = {
    //     metaDescription: "test",
    //     metaKeywords: "test",
    //     metaTitle: "test",
    //     readTime: "1",
    //     shortDescription: "test test",
    //     slug: "test",
    //     status: "Draft",
    //     tags: ["test", "good", "hi", "hello", "wow"],
    // };

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Meta Description:</strong> {data.metaDescription}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Meta Keywords:</strong> {data.metaKeywords}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Meta Title:</strong> {data.metaTitle}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Read Time:</strong> {data.readTime} minute(s)
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Short Description:</strong> {data.shortDescription}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Slug:</strong> {data.slug}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Status:</strong> {data.status}
            </div>
            {data.tags.length > 0 && (
                <div style={{ marginBottom: "10px" }}>
                    <strong>Tags:</strong>
                    <div style={{ display: "flex", gap: "10px", marginTop: "5px", flexWrap: "wrap" }}>
                        {data.tags.map((tag: any, index: any) => (
                            <>
                                {tag && (
                                    <span
                                        key={index}
                                        style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: "15px",
                                            fontSize: "14px",
                                            color: "#333",
                                            border: "1px solid #ccc",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default MetaInfo;
