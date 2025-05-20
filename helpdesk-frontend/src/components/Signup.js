import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './Signup.css';

const Signup = ({ setToken, setUserRole }) => {
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [departement, setDepartement] = useState('');
    const [role, setRole] = useState('ROLE_EMPLOYEE');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', {
                idUtilisateur,
                password,
                nom,
                prenom,
                email,
                telephone,
                departement,
                role
            });
            console.log('Signup response:', response.data);
            setToken(response.data.token);
            setUserRole(response.data.role);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            navigate(response.data.role === 'EMPLOYEE' ? '/create-ticket' : response.data.role === 'ADMIN' ? '/admin-dashboard' : '/it-tickets');
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.response) {
                console.error('Server error:', error.response.data);
                setError(error.response.data);
            } else {
                setError('Error registering user. Please try again.');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="signup-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Signup</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSignup}>
                        <Form.Group controlId="formBasicUserId">
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
                        <Form.Group controlId="formBasicNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicTelephone">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Téléphone"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDepartement">
                            <Form.Label>Département</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Département"
                                value={departement}
                                onChange={(e) => setDepartement(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="ROLE_EMPLOYEE">Employee</option>
                                <option value="ROLE_ADMIN">Admin</option>
                                <option value="ROLE_IT">IT</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Signup
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Signup;
