import React from 'react';
import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

function Login() {
    return (
        <>
            <header className="Login-header">Flashcard Bonanza</header>
            <Form>
                <Form.Control type="text" placeholder="Username" />
                <Form.Group className="mb-1"><Form.Control type="password" placeholder="Password" /></Form.Group>
                <Button variant="dark" size="sm" href="#">Log in</Button>
                <p className="Login-small-text">New user? <Link to="/signup">Sign up</Link></p>
            </Form>
        </>
  );
}

function Signup() {
    return (
        <p>Hello</p>
    );
}

export default App;
