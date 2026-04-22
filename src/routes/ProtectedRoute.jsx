import { useSelector } from "react-redux"
import { 
    // useLocation, 
    Navigate, 
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const{ isAuthenticated, loading } = useSelector((state)=> state.auth);
    // const location = useLocation();

    // Auth state henüz net değilken redirect yapma
    if (loading) return null; //ya da Spinner

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    return isAuthenticated ? children : <Navigate to="/login" replace />
    
    // return children;
};

export default ProtectedRoute;