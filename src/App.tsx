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
import {ToastAlert} from "./ToastAlert/ToastAlert";

export const ToastContext = React.createContext({
    toastText: "",
    toastShow: false,
    setToastText: (text: string) => {},
    setToastShow: (value: boolean) => {}
});

let ws: WebSocket | undefined;
export const GameContext = React.createContext({
    ws: ws,
    setWs: (ws: WebSocket) => {},
    finalScores: [{username: "", score: NaN}],
    setFinalScores: (score: any) => {},
    totalQuestions: NaN,
    setTotalQuestions: (totalQuestions: number) => {}
});

function App() {
    document.title = "Flashcard Bonanza";
    const [toastText, setToastText] = React.useState<string>("");
    const [toastShow, setToastShow] = React.useState<boolean>(false);
    const [ws, setWs] = React.useState<WebSocket | undefined>();
    const [finalScores, setFinalScores] = React.useState([]);
    const [totalQuestions, setTotalQuestions] = React.useState(NaN);
    return (
        <div data-cy="app" className="App">
            <HeaderNav/>
            <ToastContext.Provider value={{toastText: toastText, toastShow: toastShow, setToastText: setToastText, setToastShow: setToastShow}}>
                <GameContext.Provider value={{ws: ws, setWs: setWs, finalScores: finalScores, setFinalScores: setFinalScores, totalQuestions: totalQuestions, setTotalQuestions: setTotalQuestions}}>
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
                    <ToastAlert/>
                </GameContext.Provider>
            </ToastContext.Provider>
        </div>
    );
}

export default App;
