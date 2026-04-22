import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Button,
  Fab,
  Paper,
  Collapse,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { getPostById, deletePost, toggleLikePost } from "../firebase/postService";
import { useSelector } from "react-redux";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isOwner = user && post && user.uid === post.authorId;
  const isLiked = Boolean(user && post && post.likes?.includes(user.uid));
  const commentCount = post?.commentCount ?? 0;

  const [ showCommentHint, setShowCommentHint ] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Fetch post error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user || isOwner) return;

    await toggleLikePost(post.id, user.uid, isLiked);

    setPost((prev) => ({
      ...prev,
      likes: (() => {
        const currentLikes = prev.likes ?? [];
        return isLiked
          ? currentLikes.filter((uid) => uid !== user.uid)
          : [...currentLikes, user.uid];
      })(),
    }));
  };

  const handleDelete = async () => {
    if (!post?.id || !user) return;

    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await deletePost(post.id, post.imagePath);
      navigate("/");
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!post) return <Typography>Post not found.</Typography>;

  return (
    <Box>
      
        <Box 
          maxWidth={{ xs: "100%", sm: 680, md: 760 }}
          mx="auto" 
          px={{ xs: 1.5, sm: 2 }} 
          py={1}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1200,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.78)"
                : "rgba(18, 18, 18, 0.72)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}

        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              cursor: "pointer",
              width: "fit-content",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/");
            }}
          >
            <Typography fontSize={20} fontWeight="bold">←</Typography>
            <Typography fontSize={15} fontWeight="bold">Gönderi</Typography>
          </Stack>
        
      </Box>
    
    <Box
      maxWidth={{ xs: "100%", sm: 680, md: 760 }}
      mx="auto"
      sx={{
        borderLeft: {xs: "none", sm: "1px solid"},
        borderRight: {xs: "none", sm: "1px solid"},
        borderColor: "divider",
        px: { xs: 1.5, sm: 2 },
        py: { xs: 2, sm: 3 },
        pb: 10,
      }}
    >

      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar 
        src={post.authorPhotoURL}
        sx={{ width: {xs: 34, sm: 40}, height: {xs: 34, sm: 40} }}
        >
          {post.authorName?.[0]}
        </Avatar>

        <Box>
          <Typography fontWeight="bold" fontSize={15}>
            {post.authorName}
          </Typography>

          <Typography fontSize={13} color="text.secondary">
            {post.createdAt?.toDate?.().toLocaleDateString()}
          </Typography>
        </Box>
      </Stack>

      {/* Content */}
      <Typography 
        sx={{ fontSize: {xs: 14, sm: 15}}} 
        lineHeight={1.8} 
        mb={2}
      >
        {post.content}
      </Typography>

      {/* Image */}
      {post.imageURL && (
        <Box mb={2}>
          <img
            src={post.imageURL}
            alt=""
            style={{
              width: "100%",
              borderRadius: 16,
              maxHeight: 500,
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      {/* Like Section */}
      <Stack direction="row" alignItems="center" mb={2}>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 64 }}>
        <IconButton
          size="small"
          disabled={!user || isOwner}
          onClick={handleLike}
          sx={{
            transition: "transform 0.15s ease, color 0.15s ease",
            "&:active": { transform: "scale(1.3)" },
            "&:hover": { color: "error.main" },
          }}
        >
          {isLiked ? (
            <FavoriteIcon
              fontSize="small"
              color="error"
              sx={{ animation: `${pop} 0.2s ease` }}
            />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>

        <Typography
          fontSize={13}
        >
          {post.likes?.length || 0}
        </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 64 }}>
          <IconButton
            size="small"
            onClick={() => setShowCommentHint(true)}
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography fontSize={13}>{commentCount}</Typography>
        </Stack>

      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Owner Actions */}
      {isOwner && (
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/edit-post/${post.id}`)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      )}
    </Box>
    
    <Fab 
      variant="extended"
      color="primary"
      onClick={() => setShowCommentHint((prev) => !prev)}
      sx={{ 
        position: "fixed", 
        right: { xs: 14, sm: 24 },
        bottom: { xs: 14, sm: 24 },
        zIndex: 20,
      }}
    >
        <AddCommentIcon sx={{ mr: 1 }} />
        Comment
    </Fab>

    <Collapse in={showCommentHint} >
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 24 },
          bottom: { xs: 84, sm: 92 },
          width: { xs: "calc(100% - 32px)", sm: "320px" },
          p: 2,
          zIndex: 20,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontSize={14} fontWeight={600} >
            Comment feature is coming soon!
          </Typography>
          <IconButton size="small" onClick={() => setShowCommentHint(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
    </Collapse>
    
    </Box>

  );
};

export default PostDetail;
