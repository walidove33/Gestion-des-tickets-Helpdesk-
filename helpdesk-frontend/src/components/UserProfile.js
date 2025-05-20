import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import './UserProfile.css';

const UserProfile = ({ token }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    if (!user) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Card className="user-profile-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">User Profile</Card.Title>
                    <Card.Text>User ID: {user.idUtilisateur}</Card.Text>
                    <Card.Text>Name: {user.nom} {user.prenom}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Phone: {user.telephone}</Card.Text>
                    <Card.Text>Department: {user.departement}</Card.Text>
                    <Card.Text>Role: {user.role}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;
