import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './CreateTicket.css';

const CreateTicket = ({ token }) => {
    const [sujet, setSujet] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                '/api/tickets',
                { sujet, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Ticket created successfully');
            navigate('/create-ticket');
        } catch (error) {
            console.error('Failed to create ticket', error);
            setError('Failed to create ticket. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="create-ticket-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Create Ticket</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                value={sujet}
                                onChange={(e) => setSujet(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Create
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CreateTicket;
