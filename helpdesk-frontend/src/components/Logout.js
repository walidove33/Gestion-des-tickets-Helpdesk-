import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default Logout;
