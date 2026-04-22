import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logoutUser,
    googleLoginUser,
} from "./authService";

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await registerUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (_, thunkAPI) => {
        try {
            return await googleLoginUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await logoutUser();
        // console.log("logout: ok")
    }
);


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // loginStart: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // loginSuccess: (state, action) => {
        //     state.loading = false;
        //     state.user = action.payload;
        //     state.isAuthenticated = true;
        // },
        // loginFail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        // logout: (state) => {
        //     state.user = null;
        //     state.isAuthenticated = false;
        // },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                // state.user = normalizeUser(action.payload);
                // state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                // state.user = normalizeUser(action.payload);
                // state.isAuthenticated = true; 
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GOOGLE LOGIN
            .addCase(googleLogin.pending, (state)=>{
                state.loading = true;
            })
            .addCase(googleLogin.fulfilled, (state)=>{
                state.loading = false;
                // state.user = normalizeUser(action.payload);
                // state.isAuthenticated = true;
            })
            .addCase(googleLogin.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            // LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
    },
});

// export const { 
//     loginStart,
//     loginSuccess,
//     loginFail,
//     logout,
// } = authSlice.actions;

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
