import { Box, Stack, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const authItems = [
    { to: "/", label: "Home", icon: <HomeIcon fontSize="small" /> },
    { to: "/profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
    { to: "/create-post", label: "Create Post", icon: <AddBoxIcon fontSize="small" /> },
  ];

  const guestItems = [
    { to: "/", label: "Home", icon: <HomeIcon fontSize="small" /> },
    { to: "/login", label: "Login", icon: <LoginIcon fontSize="small" /> },
    { to: "/register", label: "Register", icon: <AppRegistrationIcon fontSize="small" /> },
  ];

  const items = isAuthenticated ? authItems : guestItems;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 84,
        alignSelf: "start",
        px: 0.5,
      }}
    >
      <Stack spacing={0.5}>
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Button
              key={item.to}
              component={Link}
              to={item.to}
              startIcon={item.icon}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: 999,
                px: 2,
                py: 1.2,
                fontSize: 16,
                fontWeight: active ? 700 : 500,
                color: active ? "primary.main" : "text.primary",
                backgroundColor: active ? "action.selected" : "transparent",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LeftSidebar;
