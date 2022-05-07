import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login"
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Signup from "./Signup/Signup";
import InGame from "./In-Game/In-Game";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-or-join" element={<CreateOrJoin />} />
                <Route path="/in-game" element={<InGame />} />
            </Routes>
        </div>
    );
}

export default App;
