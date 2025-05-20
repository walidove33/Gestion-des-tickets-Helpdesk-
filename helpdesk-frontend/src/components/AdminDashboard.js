import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './AdminDashboard.css';

const AdminDashboard = ({ token, userRole }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/tickets', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Tickets response:', response.data);
                setTickets(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch tickets', error);
            }
        };

        fetchTickets();
    }, [token]);

    const handleApprove = async (id) => {
        try {
            await axios.put(
                `/api/tickets/${id}/approve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTickets(tickets.map(ticket => ticket.idTicket === id ? { ...ticket, statut: 'Approved' } : ticket));
        } catch (error) {
            console.error('Failed to approve ticket', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(
                `/api/tickets/${id}/reject`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTickets(tickets.map(ticket => ticket.idTicket === id ? { ...ticket, statut: 'Rejected' } : ticket));
        } catch (error) {
            console.error('Failed to reject ticket', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <Row>
                {Array.isArray(tickets) && tickets.map((ticket) => (
                    <Col md={4} key={ticket.idTicket} className="mb-4">
                        <Card className="h-100 admin-ticket-card">
                            <Card.Body>
                                <Card.Title>{ticket.sujet}</Card.Title>
                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>Status: {ticket.statut}</Card.Text>
                                {ticket.statut !== 'Approved' && ticket.statut !== 'Rejected' && (
                                    <>
                                        <Button variant="success" className="me-2" onClick={() => handleApprove(ticket.idTicket)}>Approve</Button>
                                        <Button variant="danger" onClick={() => handleReject(ticket.idTicket)}>Reject</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
