import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './Login.css';

const Login = ({ setToken, setUserRole }) => {
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { idUtilisateur, password });
            console.log('Login response:', response.data);
            setToken(response.data.token);
            setUserRole(response.data.role);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);

            if (response.data.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (response.data.role === 'EMPLOYEE') {
                navigate('/create-ticket');
            } else if (response.data.role === 'IT') {
                navigate('/it-tickets');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid user ID or password. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Login</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter User ID"
                                value={idUtilisateur}
                                onChange={(e) => setIdUtilisateur(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
