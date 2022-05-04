import React from 'react';
import './App.css';
import { Link, Route, Routes } from "react-router-dom";

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
            <input id="username-field" type="text" placeholder="Username" className="Login-login-input"></input>
            <input id="password-field" type="text" placeholder="Password" className="Login-login-input"></input>
            <button className="Login-button">Log in</button>
            <p className="Login-small-text">New user? <Link to="/signup">Sign up</Link></p>
        </>
  );
}

function Signup() {
    return (
        <p>Hello</p>
    );
}

export default App;
