import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register, googleLogin } from "../features/auth/authSlice";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" textAlign="center">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Register
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mt: 2 }}
            onClick={() => dispatch(googleLogin())}
          >
            Sign up with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;





// const Register = () => {
//     return (
//         <h1>Register</h1>
//     )
// };

// export default Register;