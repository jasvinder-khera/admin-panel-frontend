// import React, { useEffect } from 'react'
// import { Navigate } from 'react-router-dom';


// export default function ProtectedRoute({children}) {
//     const token = localStorage.getItem('refreshToken')
    
// useEffect(()=>{

//     const isAuthenticated = !!token;
//   return isAuthenticated ? children : <Navigate to="/" replace />
// },[])
// }



import { Navigate } from 'react-router-dom';
import { useMaterialTailwindController } from '@/context';

export default function ProtectedRoute({ children }) {
    const[controller]= useMaterialTailwindController()
    const {isAuthenticated} = controller
    

    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
}