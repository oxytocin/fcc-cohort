import React from "react";
import {Card} from "react-bootstrap";
import {config, bonanza_token} from "../Constants";
import {useNavigate} from "react-router-dom";

async function createNewRoom() {
    let response;
    const url = `${config.BACKEND_HOST_LOCATION}/api/room/create`;
    const token = localStorage.getItem(bonanza_token);
    try {
        response = await fetch(url, {
            method: "POST", mode: "cors", headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (e) {
        alert("Network error encountered");
        return;
    }
    if (response.status >= 400 && response.status < 600) {
        alert("Server error encountered");
        return;
    }
    const roomID = await response.text();
    return roomID;
}

export const ChoiceBox: React.FC<{title: string, content: string}> = ({title, content}) => {
    const navigate = useNavigate();
    return (

        <Card border="dark" style={{ width: '18rem' }} className="m-2">
            <Card.Body>
                <Card.Title data-cy="card-title">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text data-cy="card-content">
                    {content}
                </Card.Text>
                <Card.Link href="#" onClick={
                    async () => {
                        const ID = await createNewRoom();
                        navigate("/waiting-room", {state: {roomID: ID}})
                    }
                }>Create Room</Card.Link>
                <Card.Link href="#">Edit Deck</Card.Link>
            </Card.Body>
        </Card>
    );
}
