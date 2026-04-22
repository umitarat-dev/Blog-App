import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "../routes/PublicRoute";

import ProtectedRoute from "../routes/ProtectedRoute";
import Profile from "../pages/Profile";
import CreatePost from "../pages/CreatePost";
import PostDetail from "../pages/PostDetail";
import EditPost from "../pages/EditPost";
import NotFound from "../pages/NotFound";


const AppRouter = ({ mode, toggleTheme }) => {
    return (
        <BrowserRouter>
        <Layout mode={mode} toggleTheme={toggleTheme}>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home />}
                />
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-post"
                    element={
                      <ProtectedRoute>
                        <CreatePost />
                      </ProtectedRoute>
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        <PostDetail />
                    }
                />
                <Route
                    path="/edit-post/:id"
                    element={
                      <ProtectedRoute>
                        <EditPost />
                      </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={<NotFound />}
                />
                
            </Routes>
        </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;