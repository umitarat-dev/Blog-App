import {
    Box,
    Typography,
    TextField,
    Button,
    CardMedia
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../firebase/postService";
import { useSelector } from "react-redux";

const EditPost = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [currentImageURL, setCurrentImageURL] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(id);

            setTitle(data.title);
            setContent(data.content);
            setCurrentImageURL(data.imageURL || "");
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async () => {
        try {
            setLoading(true);

            await updatePost({
                postId: id,
                title,
                content,
                image,
                currentImageURL,
                user,
            });

            navigate(`/post/${id}`);
        } catch (error) {
            console.error(error);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth="600px" mx="auto" mt={5}>
            <Typography variant="h5" mb={2}>
                Edit Post
            </Typography>

            {currentImageURL && (
                <CardMedia
                    component="img"
                    height="300"
                    image={currentImageURL}
                    sx={{ borderRadius: 2, mb: 2 }}
                />
            )}

            <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />

            <TextField
                fullWidth
                multiline
                rows={6}
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
            />

            <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
            >
                Change Image
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Button>

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleUpdate}
                disabled={loading}
            >
                Save Changes
            </Button>
        </Box>
    );
};

export default EditPost;