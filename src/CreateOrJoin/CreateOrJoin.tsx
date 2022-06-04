import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import {bonanza_token} from "../Constants";

function CreateOrJoin() {
    let token = localStorage.getItem(bonanza_token) ?? ""

    const decoded:{"firstName":string} = jwtDecode(token)
    let user = decoded.firstName

    return (
        <>
            <header data-cy="header" className="CreateOrJoinHeader">Flashcard Bonanza</header>
            <p data-cy="greeting">Welcome, {user}! What would you like to do?</p>
            <ButtonToolbar data-cy="btn-toolbar">
                <Button data-cy="host-btn" variant="dark" size="lg" className="mx-1">Host room</Button>
                <Button data-cy="join-btn" variant="dark" size="lg" className="mx-1">Join room</Button>
            </ButtonToolbar>
        </>
    );
}

export default CreateOrJoin;
