import React, {useEffect, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {Deck} from "../types/BackendModels";
import {Button, Col, Container, Row} from "react-bootstrap";
import {DeckElement} from "./DeckElement";
import {useSearchParams} from "react-router-dom";
import {DeckList} from "./DeckList";
import {SelectedDeck} from "./SelectedDeck";

type deckId = number;

let nullDeck: Deck = {
    ID: 0,
    CreatedAt: "",
    DeletedAt: null,
    Description: "",
    FlashCards: null,
    OwnerId: 0,
    UpdatedAt: "",
};

const getDeckOrDefault = (decks: Array<Deck> | null, currentDeckId: string | null): Deck => {
    let id = 0;

    if (currentDeckId) {
        id = Number(currentDeckId);
    }
    if (decks){
        for (let i = 0; i < decks.length; i++) {
            if (decks[i].ID === id){
                return decks[i];
            }
        }
    }

    return nullDeck;
}

export const LoadAndEditDeck: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [decks, setDecks] = useState<Array<Deck> | null>(null)
    const selectedDeck = getDeckOrDefault(decks, searchParams.get("id"));
    console.log("what's the selected deck? ",selectedDeck);
    const getDecks = () => {
        const url = `${config.BACKEND_HOST_LOCATION}/api/deck/owner`;
        const token = localStorage.getItem(bonanza_token);
        fetch(url, {
                method: "GET", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        ).then<Array<Deck>>(res => res.json()
        ).then(data => {
                console.log("TESTING", data);
                setDecks(data)
            }
        ).catch(err => {
                console.log("error is: ", err);
            }
        );
    }

    useEffect(() => getDecks(), [])


    return (
        <Container fluid>
            <Row>
                <Col xs={2} m={6}>
                    <DeckList decks={decks} refresh={getDecks}/>
                </Col>
                <Col xs={10} md={6}>
                    <SelectedDeck selectedDeck={selectedDeck} refresh={getDecks}/>
                </Col>

            </Row>
        </Container>
    )
}

