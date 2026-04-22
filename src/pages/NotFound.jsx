import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Box 
            sx={{
                maxWidth: "600px",
                mx: "auto",
                px: 2,
                py: 6,
                textAlign: "center",
            }}
        >
            <Typography 
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                404 - Not Found
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Aradığın sayfa bulunamadı. Ana sayfaya dönmek ister misin?
            </Typography>
            <Button variant="contained" component={Link} to="/">
                Ana Sayfa
            </Button>
        </Box>
    );
};

export default NotFound;