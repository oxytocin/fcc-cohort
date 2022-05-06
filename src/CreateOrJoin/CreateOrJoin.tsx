import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

function CreateOrJoin() {
    return (
        <>
            <header className="CreateOrJoinHeader">Flashcard Bonanza</header>
            <p>Welcome, [user]! What would you like to do?</p>
            <ButtonToolbar>
                <Button variant="dark" size="lg" className="mx-1">Host room</Button>
                <Button variant="dark" size="lg" className="mx-1">Join room</Button>
            </ButtonToolbar>
        </>
    );
}

export default CreateOrJoin;
