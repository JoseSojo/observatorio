import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children:ReactNode }) => {
    
    const token = window.localStorage.getItem(`token`);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const NotProtectedRoute = ({ children }: { children:ReactNode }) => {
    
    const token = window.localStorage.getItem(`token`);

    if (token) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};