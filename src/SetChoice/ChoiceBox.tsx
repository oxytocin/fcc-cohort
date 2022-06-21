import React, {useContext} from "react";
import {Card} from "react-bootstrap";
import {bonanza_token, config} from "../Constants";
import {useNavigate} from "react-router-dom";
import {fetchFromBackend, showToast} from "../utils";
import {ToastContext} from "../App";

export const ChoiceBox: React.FC<{ title: string, content: string, deckID: number, del: Function }> = ({title, content, deckID, del}) => {
    const toastContext = useContext(ToastContext);
    const navigate = useNavigate();

    async function createNewRoom() {
        const token = localStorage.getItem(bonanza_token);
        let response;
        try {
            response = await fetchFromBackend(config.CREATE_ROOM_ENDPOINT, {
                method: "POST", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (e) {
            showToast("There was an error creating the room", toastContext);
            return;
        }
        const roomID = await response.text();
        return roomID;
    }

    return (
        <Card border="dark" style={{width: '18rem'}} className="m-2">
            <Card.Body>
                <Card.Title data-cy="card-title">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text data-cy="card-content">
                    {content}
                </Card.Text>
                <Card.Link onClick={
                    async () => {
                        const roomID = await createNewRoom();
                        navigate("/waiting-room", {state: {roomID: roomID, isAdmin: true, deckID: deckID}})
                    }
                } href="#">Start Game</Card.Link>
                <Card.Link onClick={()=>navigate(`/edit-deck?id=${deckID}`)} className="text-success" href="#">Edit Deck</Card.Link><br/>
                <Card.Link onClick={()=>del()} className="text-danger" href="#">Delete Deck</Card.Link>
            </Card.Body>
        </Card>
    );
}
