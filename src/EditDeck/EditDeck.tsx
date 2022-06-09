import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Col, Container, Row, Card} from "react-bootstrap";
import {ExistingDecks} from "./ExistingDecks";
import {UpdateDeck} from "./UpdateDeck";
import {Deck} from "../types/BackendModels";
import {bonanza_token, config} from "../Constants";

const nullDeck: Deck = {
    ID: 0,
    OwnerId: 0,
    Description: ""
}
export const EditDeck: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [selectedDeck, setDeck] = useState<Deck>(nullDeck)
    const [selectedCard, setSelectedCard] = useState<FlashCard>();
    const updateDecks = (id: number) => {
        const url = `${config.BACKEND_HOST_LOCATION}/api/deck/${id}`;
        const token = localStorage.getItem(bonanza_token);
        fetch(url, {
                method: "GET", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        ).then<Deck>(res => res.json()
        ).then(data => {
                console.log("TESTING", data)
                setDeck(data);
            }
        ).catch(err => {
                console.log("error is: ", err)
                setDeck(nullDeck)
            }
        );
    }
    useEffect(() => {
        let deckId = searchParams.get("id");
        if (deckId != null) {
            let res = Number(deckId)
            if (!isNaN(res)) {
                setSelectedCard(res)
            }
        } else {
            setSelectedCard(null);
        }

        // updateDecks();
    }, [])
    // const selectedDeck = allDecks.find(value => value.ID == selectedDeckId)
    return (
        <Container>
            <Row>
                <Col sm={2}>
                    <ExistingDecks selectedDeck={selectedDeck}/>
                </Col>
                <Col sm={10}>
                    <UpdateDeck selectedDeck={selectedDeck}/>
                </Col>
            </Row>
        </Container>
    )
};
