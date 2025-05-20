import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateTicket from './components/CreateTicket';
import AdminDashboard from './components/AdminDashboard';
import ITTicketList from './components/ITTicketList';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

    useEffect(() => {
        console.log('Token:', token);
        console.log('UserRole:', userRole);
        setToken(localStorage.getItem('token'));
        setUserRole(localStorage.getItem('userRole'));
    }, [token, userRole]);

    const handleLogout = () => {
        setToken(null);
        setUserRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    };

    return (
        <Router>
            <Navbar token={token} userRole={userRole} handleLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} setUserRole={setUserRole} />} />
                <Route path="/signup" element={<Signup setToken={setToken} setUserRole={setUserRole} />} />
                <Route element={<ProtectedRoute isAuthenticated={token} />}>
                    <Route path="/" element={<Navigate to={userRole === 'EMPLOYEE' ? '/create-ticket' : userRole === 'ADMIN' ? '/admin-dashboard' : '/it-tickets'} />} />
                    <Route path="/create-ticket" element={<CreateTicket token={token} />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard token={token} userRole={userRole} />} />
                    <Route path="/it-tickets" element={<ITTicketList token={token} />} />
                    <Route path="/user-profile" element={<UserProfile token={token} />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
