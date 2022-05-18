import React from 'react';
import './App.css';
import OauthRedirect from "./OauthRedirect/OauthRedirect";
import Login from "./Login/Login"
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Signup from "./Signup/Signup";
import {HeaderNav} from "./Header/Navigation";
import InGame from "./In-Game/In-Game";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/oauth-redirect" element={<OauthRedirect />} />
                <Route path="/create-or-join" element={<CreateOrJoin />} />
                <Route path="/in-game" element={<InGame />} />
            </Routes>
        </div>
    );
}

export default App;
