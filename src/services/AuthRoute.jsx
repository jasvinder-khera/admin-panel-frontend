import { Navigate } from "react-router-dom";
import { useMaterialTailwindController } from "@/context";
export default function AuthRoute({ children }) {
   const [controller] = useMaterialTailwindController()
   const {isAuthenticated} = controller
    
    // If user is already authenticated, redirect to dashboard
    return !isAuthenticated ? children : <Navigate to="/dashboard/home" replace />;
}