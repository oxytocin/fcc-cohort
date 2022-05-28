import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import account from "../images/account.svg";

export const HeaderNav: React.FC = () => (
    <Navbar bg="light" expand="md" fixed="top">
        <Container>
            {/* This is the mobile element, will do a 'hamburger' button */}
            <Navbar.Brand data-cy="nav-home" href="#home">Flashcard Bonanza</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse data-cy="nav-collapse" id="basic-navbar-nav">
                <Nav className="d-block d-sm-block d-md-none">
                    <Nav.Link data-cy="nav-logout" href="#home">Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {/* this is the original design, but not meant for mobile */}
            <Nav className="d-none d-md-block">
                <NavDropdown data-cy="nav-dropdown" title={<img src={account}/>} id="basic-nav-dropdown" className="d-flex">
                    <NavDropdown.Item data-cy="dropdown-logout" href="#">Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
    </Navbar>
);

