import React from 'react';
import './App.css';
import Login from "./Login/Login"
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import {HeaderNav} from "./Header/Navigation";
import InGame from "./In-Game/In-Game";
import {Route, Routes} from "react-router-dom";
import ScoreSummary from "./Summary/Summary";
import OauthRedirect from "./OAuthRedirect/OauthRedirect";
import {SetChoice} from "./SetChoice/SetChoice";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import WaitingRoom from "./WaitingRoom/WaitingRoom";
import {EditDeckQuestions} from './EditDeck/EditDeckQuestions';
import {Dummy} from "./utils";

export const ToastContext = React.createContext({
    toastText: "hi",
});

function App() {
    document.title = "Flashcard Bonanza";
    return (
        <div data-cy="app" className="App">
            <HeaderNav/>
            <ToastContext.Provider value={{toastText: "hi"}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/oauth-redirect" element={<OauthRedirect/>}/>
                    <Route path="/create-or-join" element={<PrivateRoute><CreateOrJoin/></PrivateRoute>}/>
                    <Route path="/set-choice" element={<PrivateRoute><SetChoice/></PrivateRoute>}/>
                    <Route path="/in-game" element={<PrivateRoute><InGame/></PrivateRoute>}/>
                    <Route path="/summary" element={<PrivateRoute><ScoreSummary/></PrivateRoute>}/>
                    <Route path="/waiting-room" element={<PrivateRoute><WaitingRoom/></PrivateRoute>}/>
                    <Route path="/edit-deck" element={<PrivateRoute><EditDeckQuestions/></PrivateRoute>}/>
                </Routes>
                <Dummy/>
            </ToastContext.Provider>
        </div>
    );
}

export default App;
