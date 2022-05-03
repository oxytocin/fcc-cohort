import React from 'react';
import './App.css';
import {SetChoice} from "./SetChoice/SetChoice";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/choice" element={<SetChoice/>}/>
                <Route path="/choice2" element={<SetChoice/>}/>
            </Routes>
        </div>
    );
}

export default App;
