import { Container, Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login, googleLogin } from "../features/auth/authSlice";
import GoogleIcon from "@mui/icons-material/Google";


const Login = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <Container maxWidth="xs">
            <Box 
                sx={{ mt: 8 }}
            >
                <Typography variant="h5" textAlign="center">
                    Login
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField 
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        Login
                    </Button>

                    <Button 
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => dispatch(googleLogin())}
                    >
                        Login with Google
                    </Button>

                </Box>
            </Box>
        </Container>

    );
};

export default Login;





// import { Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../features/auth/authSlice";

// const Login = () => {
    
//     const dispatch = useDispatch();

//     return (
//         <Button 
//             variant="contained"
//             onClick={()=>{
//                 dispatch(loginSuccess({email: "test@test.com"}))
//             }}
//         >
//             Mock Login
//         </Button>
//     )
// };

// export default Login;