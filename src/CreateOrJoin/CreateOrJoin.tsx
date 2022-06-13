import React from 'react';
import {Button, ButtonToolbar, Form} from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import {bonanza_token} from "../Constants";
import {useNavigate} from 'react-router-dom'

function CreateOrJoin() {
    let token = localStorage.getItem(bonanza_token) ?? ""
    const decoded:{"firstName":string} = jwtDecode(token)
    let user = decoded.firstName
    const navigate = useNavigate();

    function getRoomID() {
        //@ts-ignore
        return document.getElementById("roomID").value;
        }

    return (
        <>
            <header data-cy="header" className="CreateOrJoinHeader">Flashcard Bonanza</header>
            <p data-cy="greeting">Welcome, {user}! What would you like to do?</p>
            <Button onClick={()=>{navigate("/set-choice")}} data-cy="host-btn" variant="dark" size="lg" className="mb-1">Host room</Button> {/* Am I a bad boy for hardcoding this path? */}
            <Button onClick={()=>{navigate("/waiting-room", {state: {roomID: getRoomID()}})}} data-cy="join-btn" variant="dark" size="lg" className="mx-1">Join room</Button>
            <input id="roomID" placeholder="Room ID"></input>
        </>
    );
}

export default CreateOrJoin;
