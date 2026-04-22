import { Box, Typography, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { createPost } from "../firebase/postService";
import { useNavigate } from "react-router-dom";
import { uploadPostImage } from "../firebase/storageService";

const CreatePost = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCreatePost = async () => {
        if (!content.trim()) {
            alert("Content is required.");
            return;
        }

        try {
            setLoading(true);
            let imageURL = "";
            let imagePath = "";
            // 🔥 Foto varsa → upload et
            if (image) {
                const uploaded = await uploadPostImage(user.uid, image);
                imagePath = uploaded.imagePath;
                imageURL = uploaded.imageURL;
            }

            await createPost({ 
                title, 
                content, 
                user, 
                imageURL,
                imagePath,
             });            
            // Redirect to home or post detail page after creation
            navigate("/");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        };
    };
    
    return (
        <Box sx={{
            maxWidth: 600, 
            mx: "auto",
            mt: 6
        }}>
            <Typography variant="h5" gutterBottom>
                Create Post
            </Typography>
            <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
            <TextField
                fullWidth
                label="Content"
                margin="normal"
                multiline
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)} 
            />
            <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
            >
              Select Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            </Button>

            {image && (
                <Box mt={2} textAlign="center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 200,
                      borderRadius: 8,
                    }}
                  />
                </Box>
            )}

            {image && (
              <Typography variant="body2" mt={1}>
                Selected: {image.name}
              </Typography>
            )}

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleCreatePost}
                disabled={loading}
            >
                {/* {loading ? "Creating..." : "Create Post"} */}
                Publish
            </Button>
        </Box>
    );
};

export default CreatePost;
