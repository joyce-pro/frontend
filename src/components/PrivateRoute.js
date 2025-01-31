import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');

    return token ? <><Navbar />{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
