// import React from 'react';
// import { Navbar, Nav, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const CustomNavbar = ({ token, handleLogout }) => {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href="/">Helpdesk</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="me-auto">
//           {token && <Nav.Link as={Link} to="/create-ticket">Create Ticket</Nav.Link>}
//           {token && <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>}
//           {token && <Nav.Link as={Link} to="/it-tickets">IT Tickets</Nav.Link>}
//         </Nav>
//         {token && (
//           <Button variant="outline-primary" onClick={handleLogout}>
//             Logout
//           </Button>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default CustomNavbar;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = ({ token, userRole, handleLogout }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">MyRequest Intelcia</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {token && userRole === 'employee' && (
                        <>
                            <Nav.Link as={Link} to="/create-ticket">Create Ticket</Nav.Link>
                            <Nav.Link as={Link} to="/view-tickets">View Tickets</Nav.Link>
                        </>
                    )}
                    {token && userRole === 'admin' && (
                        <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                    )}
                    {token && userRole === 'IT' && (
                        <Nav.Link as={Link} to="/it-tickets">IT Tickets</Nav.Link>
                    )}
                </Nav>
                {token && (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
