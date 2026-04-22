import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // Auth state henüz belirlenmediyse (listener çalışıyorken)
    if (loading) return null; // ya da Spinner

    return !isAuthenticated ? children : <Navigate to="/" replace />
};

export default PublicRoute;