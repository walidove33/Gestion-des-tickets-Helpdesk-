import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import './TicketList.css';

const TicketList = ({ token, userRole }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/tickets', {
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
            <h2 className="text-center mb-4">Tickets</h2>
            <Table striped bordered hover className="ticket-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.idTicket}>
                            <td>{ticket.sujet}</td>
                            <td>{ticket.statut}</td>
                            <td>{ticket.priorite}</td>
                            <td>
                                <Link to={`/ticket/${ticket.idTicket}`}>
                                    <Button variant="info">View</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {userRole === 'EMPLOYEE' && (
                <Link to="/create-ticket" className="d-block mt-3">
                    <Button variant="success">Create Ticket</Button>
                </Link>
            )}
        </Container>
    );
};

export default TicketList;
