import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar, NavDropdown } from 'react-bootstrap';
import Login from "./Login/Login"
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Signup from "./Signup/Signup";
import account from "./images/account.svg";

function App() {
    return (
        <div className="App">
            <Navbar bg="light" fixed="top" expand="lg">
                <NavDropdown className="ms-auto" title={ <img src={account} /> }>
                    <NavDropdown.Item>Log out</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-or-join" element={<CreateOrJoin />} />
            </Routes>
        </div>
    );
}

export default App;
