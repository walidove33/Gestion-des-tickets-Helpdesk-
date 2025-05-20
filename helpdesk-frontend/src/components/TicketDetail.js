import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './TicketDetail.css';

const TicketDetail = ({ token, userRole }) => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`/api/tickets/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTicket(response.data);
            } catch (error) {
                console.error('Failed to fetch ticket', error);
            }
        };

        fetchTicket();
    }, [id, token]);

    if (!ticket) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Card className="ticket-detail-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">{ticket.sujet}</Card.Title>
                    <Card.Text>{ticket.description}</Card.Text>
                    <Card.Text>Status: {ticket.statut}</Card.Text>
                    <Card.Text>Priority: {ticket.priorite}</Card.Text>
                    {userRole === 'ADMIN' && (
                        <>
                            <Button variant="success" className="me-2">Approve</Button>
                            <Button variant="danger">Reject</Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TicketDetail;
