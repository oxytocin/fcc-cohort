import React, {useEffect, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {copyDeck, Deck} from "../types/BackendModels";
import {Col, Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {DeckList} from "./DeckList";
import {SelectedDeck} from "./SelectedDeck";

type deckId = number;

let nullDeck: Deck = {
    ID: 0,
    CreatedAt: "",
    DeletedAt: null,
    Description: "nulldeck",
    FlashCards: null,
    OwnerId: 0,
    UpdatedAt: "",
};


const getDeckOrDefault = (decks: Map<number, Deck> | null, currentDeckId: string | null): Deck => {
    let id = 0;

    if (currentDeckId) {
        id = Number(currentDeckId);
        if (decks && !isNaN(id) && decks.has(id)) {
            // @ts-ignore
            return decks.get(id);
        }
    }

    return nullDeck;
}


export const LoadAndEditDeck: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [decks, setDecks] = useState<Map<number, Deck> | null>(null)
    const [deckKeys, setDeckKeys] = useState<Array<number>>([]);
    const [selectedDeck, setSelectedDeck] = useState(nullDeck);

    const getDecks = () => {
        const url = `${config.BACKEND_HOST_LOCATION}/api/deck/owner`;
        const token = localStorage.getItem(bonanza_token);
        fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        ).then<Array<Deck>>(res => res.json()
        ).then((data?: Deck[]) => {
                let keys: Array<number> = [];
                let mappedData = new Map<deckId, Deck>();
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        let e = data[i];
                        keys.push(e.ID);
                        mappedData.set(e.ID, e);
                    }
                }
                keys.sort((x, y) => x - y);

                setDeckKeys(keys);
                setDecks(mappedData)

                setSelectedDeck(getDeckOrDefault(mappedData, searchParams.get("id")))
            }
        ).catch(err => {
                console.error("error is: ", err);
                alert(err);
            }
        );
    }

    useEffect(getDecks, [])


    return (
        <Container fluid>
            <Row>
                <Col xs={2} m={6}>
                    <DeckList decks={decks} deckKeys={deckKeys} refresh={getDecks} chooseDeck={setSelectedDeck}
                              updateSearchParams={setSearchParams}/>
                </Col>
                <Col xs={10} md={6}>
                    <SelectedDeck
                        selectedDeck={copyDeck(selectedDeck)}
                        refresh={getDecks}
                        allDecks={decks}
                        setDecks={setDecks}
                    />
                </Col>

            </Row>
        </Container>
    )
}

