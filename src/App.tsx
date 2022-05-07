import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login"
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Signup from "./Signup/Signup";
import {HeaderNav} from "./Header/Navigation";


function App() {
    return (
        <div className="App">
            <HeaderNav/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/create-or-join" element={<CreateOrJoin/>}/>
            </Routes>
        </div>
    );
}

export default App;
