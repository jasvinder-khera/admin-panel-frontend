import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
 
    <Routes>
     
      <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
