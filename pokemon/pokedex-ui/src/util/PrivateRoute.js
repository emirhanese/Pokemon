import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "./useLocalStorage";

const PrivateRoute = ({ children }) => {
    const [auth, setAuth] = useLocalState("", "auth");
    return auth.token ? children : <Navigate to="/login" />;
};

export { PrivateRoute };