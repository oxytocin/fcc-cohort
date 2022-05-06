import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

export default Login;
