import { 
    Box, 
    Typography, 
    Avatar,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts, toggleLikePost } from "../firebase/postService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/system";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const Home = () => {
    // const MAX_CHARS = 180;
    const MAX_CHARS = 140; // mobilde daha az gösterelim
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const getTruncatedText = (text, max) => {
        if (text.length <= max) return text;
        return text.slice(0, max) + "...";
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Fetch posts error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLike = async (e, post) => {
        e.stopPropagation(); // card click’i engelle

        if (!user) return;

        const isOwner = user.uid === post.authorId;
        if (isOwner) return;

        const isLiked = post.likes?.includes(user.uid);

        await toggleLikePost(post.id, user.uid, isLiked);

        // optimistic UI update
        setPosts(prev =>
            prev.map(p =>
                p.id === post.id
                    ? (() => {
                        const currentLikes = p.likes ?? [];
                        return {
                            ...p,
                            likes: isLiked
                                ? currentLikes.filter(id => id !== user.uid)
                                : [...currentLikes, user.uid],
                        };
                    })()
                    : p
            )
        );
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box 
            maxWidth={{ xs: "100%", sm: 680, md: 760 }} 
            mx="auto" 
            sx={{ 
                borderLeft: { xs: "none", sm: "1px solid" },
                borderRight: { xs: "none", sm: "1px solid" },
                borderColor: "divider",
            }}
        >
            {posts.map((post) => {
                const isLiked = user && post.likes?.includes(user.uid);
                const isOwner = user && user.uid === post.authorId;
                const commentCount = post.commentCount ?? 0;

                return (
                    <Box
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)}
                        sx={{
                            display: "flex",
                            gap: { xs: 1.25, sm: 2 },
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 1.5, sm: 2 },
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "action.hover",
                            },
                        }}
                    >
                        {/* Avatar */}
                        <Avatar 
                            src={post.authorPhotoURL}
                            sx={{ 
                                width: {xs: 34, sm: 40}, 
                                height: {xs: 34, sm: 40} 
                            }}
                        >
                            {post.authorName?.[0]}
                        </Avatar>

                        {/* Content Area */}
                        <Box flex={1}>

                            {/* Header */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography fontWeight="bold" fontSize={14}>
                                    {post.authorName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontSize={13}
                                >
                                    · {post.createdAt?.toDate().toLocaleDateString()}
                                </Typography>
                            </Stack>

                            {/* Text */}
                            <Typography
                                mt={0.5}
                                sx={{
                                    whiteSpace: "pre-line",
                                    display: expandedPosts[post.id] ? "block" : "-webkit-box",
                                    WebkitLineClamp: expandedPosts[post.id] ? "unset" : 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    fontSize: { xs: 13.5, sm: 14 },
                                }}
                            >
                                {expandedPosts[post.id] 
                                    ? post.content 
                                    : getTruncatedText(post.content, MAX_CHARS)}
                            </Typography>

                            {post.content.length > MAX_CHARS && (
                              <Typography
                                variant="body2"
                                fontSize={13}
                                sx={{
                                  mt: 0.5,
                                  color: "primary.main",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                  width: "fit-content",
                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation(); // 🚨 çok önemli
                                  toggleExpand(post.id);
                                }}
                              >
                                {expandedPosts[post.id] ? "Show less" : "Show more"}
                              </Typography>
                            )}

                            {/* Image */}
                            {post.imageURL && (
                                <Box mt={1}>
                                    <img
                                        src={post.imageURL}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            borderRadius: 16,
                                            maxHeight: 400,
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Actions */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                // spacing={1}
                                mt={1.25}
                            >
                                <Stack 
                                    direction="row" 
                                    spacing={0.5} 
                                    alignItems="center" 
                                    sx={{ minWidth: 64 }}
                                >
                                <IconButton
                                    size="small"
                                    disabled={!user || isOwner}
                                    onClick={(e) => handleLike(e, post)}
                                    sx={{
                                        transition: "transform 0.15s ease, color 0.15s ease", 
                                        "&:active": {
                                            transform: "scale(1.3)",
                                        },
                                        "&:hover": {
                                            color: "error.main",
                                        },
                                    }}
                                >
                                    {isLiked ? (
                                        <FavoriteIcon
                                            fontSize="small"
                                            color="error"
                                            sx={{
                                                animation: `${pop} 0.2s ease`,
                                            }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            fontSize="small"
                                        />
                                    )}
                                </IconButton>

                                <Typography
                                    // variant="body2"
                                    // color="text.secondary"
                                    fontSize={13}
                                    // sx={{
                                    //     transition: "transform 0.15s ease",
                                    //     transform: isLiked ? "scale(1.2)" : "scale(1)",
                                    // }}
                                >
                                    {post.likes?.length || 0}
                                </Typography>
                                </Stack>

                                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 64 }}>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/post/${post.id}`);
                                      }}
                                      sx={{ "&:hover": { color: "primary.main" } }}
                                    >
                                      <ChatBubbleOutlineIcon fontSize="small" />
                                    </IconButton>
                                    <Typography fontSize={13}>{commentCount}</Typography>
                                </Stack>
                            </Stack>

                        </Box>
                    </Box>
                );
            })}
            {isAuthenticated && (
                <Fab
                  variant="extended" 
                  component={Link}
                  to="/create-post"
                  color="primary"
                  aria-label="create post"
                  sx={{
                    position: "fixed",
                    bottom: { xs: 14, md: 24 },
                    right: { xs: 14, md: 24 },
                    zIndex: 1200,
                    boxShadow: 6,
                  }}
                >
                    <AddIcon />
                </Fab>
            )}
        </Box>
    );
};

export default Home;
