import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


import { setUser } from "../features/auth/authSlice";

import { updateUserProfile } from "../firebase/userService";

// Upload + Firestore update
import { uploadProfilePhoto } from "../firebase/storageService";


const Profile = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null); 


  const handleFileChange = (e) => {
      if (e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
      }
  };


  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let photoURL = user.photoURL;

      // 1️⃣ Foto varsa → upload
      if (selectedFile) {
        photoURL = await uploadProfilePhoto(user.uid, selectedFile);
      }

      // 2️⃣ Firestore update (tek sefer)
      const updatedUser = await updateUserProfile(user.uid, {
        displayName,
        photoURL,
      });

      // 3️⃣ Redux sync
      dispatch(setUser({
        ...user,
        ...updatedUser,
      }));

      setSelectedFile(null);
    } catch (error) {
        console.error("Profile update failed:", error);
    } finally {
        setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Avatar
        // src={user.photoURL || ""}
        src={
          selectedFile ? URL.createObjectURL(selectedFile) :
          user.photoURL || ""
        }
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
        {/* {user.displayName?.[0] || user.email?.[0]} */}
        <Button variant="outlined" component="label" fullWidth>
            Select Photo
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
        </Button>

      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>

      <TextField
        fullWidth
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        value={user.email}
        disabled
        margin="normal"
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        // onClick={handleUpdateProfile}
        onClick={handleSaveProfile}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </Box>
  );
};

export default Profile;
