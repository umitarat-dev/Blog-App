
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from "@mui/material/Stack";
import logo from "../assets/design.svg";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Avatar from '@mui/material/Avatar';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar({mode, toggleTheme}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

//   const isAuthenticated = false; // şimdilik mock
  const { isAuthenticated, user } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const themeMenuItem = (
    <MenuItem
      key="theme"
      onClick={() => {
        toggleTheme();
        handleClose();
      }}
      sx={{
        borderRadius: 2,
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        {mode === "dark" ? "Light Mode" : "Dark Mode"}
      </Box>
    </MenuItem>
  );



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position='sticky'
        elevation={0}
        sx={(theme) => ({
          backdropFilter: "blur(8px)",
          backgroundColor: 
            theme.palette.mode == "light"
            ? "rgba(50, 184, 225, 0.8)" 
            : "rgba(18,18,18,0.85)",
          borderBottom: 
            theme.palette.mode === "light"
            ? "1px solid rgba(0,0,0,0.12)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            theme.palette.mode === "dark"
            ? "0 2px 10px rgba(0,0,0,0.6)"
            : "0 1px 6px rgba(0,0,0,0.8)",
        })}
      >
        <Toolbar sx={{ display: "flex", minHeight: { xs: 60, sm: 64 } }}>
            {/* LEFT */}
            <Box>
                <IconButton 
                    color="inherit"
                    component={Link} 
                    to="/"
                >
                    <Box 
                      component="img"
                      src={logo} 
                      alt="logo" 
                      width={{ xs: 32, sm: 40 }}
                      sx ={(theme) => ({
                        filter: 
                          theme.palette.mode === "dark" 
                            ? "brightness(0.85)" 
                            : "none",
                        transition: "0.2s",
                        "&:hover": {
                          transform: "scale(1.08)",
                          filter:
                            theme.palette.mode === "dark"
                              ? "brightness(1)"
                             : "brightness(1.05)",
                        },
                      })} 
                    />
                </IconButton>
            </Box>

            {/* CENTER */}
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography 
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 700,
                  letterSpacing: 0.2,
                }}
              >
                UmitDev Blog
              </Typography>
            </Box>

            {/* RIGHT */}
            <Box sx={{ 
                // flex: 1, 
                display: "flex", 
                justifyContent: "flex-end" 
                }}>
              {/* Account menu burada */}            
              <div>
                <IconButton
                  size="large"
                  // aria-label="account of current user"
                  // aria-controls="menu-appbar"
                  // aria-haspopup="true"
                  onClick={handleMenu}
                  // color="inherit"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "light"
                        ? "rgba(0,0,0,0.65)"
                        : "rgba(255,255,255,0.7)",
                  })}
                >
                  {isAuthenticated ? (
                      <Avatar
                        src={user?.photoURL || undefined}
                        alt={user?.displayName || user?.email}
                        sx={(theme) => ({ 
                          width: 36, 
                          height: 36,
                          // bgcolor: user?.photoURL ? "transparent" : "#FFD369",
                          // bgcolor: "primary.main",
                          bgcolor: 
                            theme.palette.mode === "light"
                              ? "rgba(255,255,255,0.85)"
                              : "rgba(255,255,255,0.12)",
                          color:
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,0.7)"
                              : "rgba(255,255,255,0.85)",
                          border:
                            theme.palette.mode === "light"
                              ? "1px solid rgba(255,255,255,0.6)"
                              : "1px solid rgba(255,255,255,0.25)",
                              transition: "0.2s",
                          "&:hover": {
                            transform: "scale(1.08)",
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "rgba(255,255,255,1)"
                                : "rgba(255,255,255,0.18)",
                          },
                        })}>
                          {/* photo yoksa harf göster */}
                          {user?.displayName?.[0] || user?.email?.[0]}
                        </Avatar>
                    ) : (
                      <AccountCircle sx={{ fontSize: 36 }}/>
                    )
                  }
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 3,
                      minWidth: 260,
                      p: 2,
                    },
                  }}
                >
                  {isAuthenticated ? (
                    <Box sx={{ textAlign: "center" }}>

                      {/* Avatar */}
                      <Avatar
                        src={user?.photoURL || undefined}
                        sx={(theme) => ({
                          width: 72,
                          height: 72,
                          mx: "auto",
                          mb: 1,
                          bgcolor: 
                            theme.palette.mode === "light"
                              ? "rgba(255,255,255,0.7)"
                              : "rgba(255,255,255,0.12)",
                          color: 
                            theme.palette.mode === "light"
                              ? "rgba(0,0,0,0.7)"
                              : "rgba(255,255,255,0.85)",
                        })}
                      >
                        {user?.displayName?.[0] || user?.email?.[0]}
                      </Avatar>
                      
                      {/* Name */}
                      <Typography fontWeight="bold">
                        {user?.displayName || "User"}
                      </Typography>
                      
                      {/* Email */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {user?.email}
                      </Typography>
                      
                      {/* Actions */}
                      <Stack direction="column" spacing={1} justifyContent="center">
                        <MenuItem
                          component={Link}
                          to="/profile"
                          onClick={handleClose}
                          sx={{
                            borderRadius: 2,
                            justifyContent: "center",
                          }}
                        >
                          Profile
                        </MenuItem>
                          {themeMenuItem}
                        <MenuItem
                          onClick={() => {
                            dispatch(logout());
                            handleClose();
                          }}
                          sx={{
                            borderRadius: 2,
                            justifyContent: "center",
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Stack>
                    </Box>
                  ) : (
                    <>
                      <MenuItem component={Link} to="/login" onClick={handleClose}>
                        Login
                      </MenuItem>
                      <MenuItem component={Link} to="/register" onClick={handleClose}>
                        Register
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </div>
            </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
