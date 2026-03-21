import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({ children } :ProtectedRouteProps){
    const token = localStorage.getItem('access')

    return token ? children : <Navigate to='/login' />
}
