import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useLocation, useNavigate} from 'react-router-dom';
import account from "../images/account.svg";

export const HeaderNav: React.FC = () => {
    // Don't show navbar on login page (root)
    const navigate = useNavigate();
    if (useLocation().pathname === "/") return null;
    function logOut() {
        // TODO: doesn't invalidate the token, so if an attacker got it or
        // something, they could still log in.
        localStorage.clear();
        navigate("/");
    }
    return (
        <Navbar bg="light" expand="md" fixed="top">
            <Container data-cy="nav-container">
                {/* This is the mobile element, will do a 'hamburger' button */}
                <Navbar.Brand data-cy="nav-home" href="/">Flashcard Bonanza</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse data-cy="nav-collapse" id="basic-navbar-nav">
                    <Nav className="d-block d-sm-block d-md-none">
                        <Nav.Link data-cy="nav-logout" href="#home">Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/* this is the original design, but not meant for mobile */}
                <Nav className="d-none d-md-block">
                    <NavDropdown data-cy="nav-dropdown" title={<img alt="account-icon" src={account}/>} id="basic-nav-dropdown" className="d-flex">
                        <NavDropdown.Item onClick={logOut} data-cy="dropdown-logout" href="#">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
};

