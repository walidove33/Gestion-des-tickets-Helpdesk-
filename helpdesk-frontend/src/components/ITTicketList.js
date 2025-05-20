import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './ITTicketList.css';

const ITTicketList = ({ token }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/tickets/approved', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTickets(response.data);
            } catch (error) {
                console.error('Failed to fetch tickets', error);
            }
        };

        fetchTickets();
    }, [token]);

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">IT Ticket List</h2>
            <Row>
                {tickets.map((ticket) => (
                    <Col md={4} key={ticket.idTicket} className="mb-4">
                        <Card className="h-100 it-ticket-card">
                            <Card.Body>
                                <Card.Title>{ticket.sujet}</Card.Title>
                                <Card.Text>{ticket.description}</Card.Text>
                                <Card.Text>Status: {ticket.statut}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ITTicketList;
