import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {copyDeck, Deck} from "../types/BackendModels";
import {Button, Col, Container, Overlay, Popover, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {DeckEdit} from "./DeckEdit";
import { fetchFromBackend, showToast } from '../utils';
import { ToastContext } from '../App';


type deckId = number;

function getIdOrZero(id: string | null): number {
    if (id) {
        const temp = parseInt(id, 10);
        if (!isNaN(temp)) {
            return temp;
        }
    }
    return 0;
}

export const LoadAndEditDeck: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [decks, setDecks] = useState<Map<number, Deck>>(new Map())
    const [deckKeys, setDeckKeys] = useState<Array<number>>([]);
    const setSelectedDeckId = (id: number) => {
        setSearchParams({id: id.toString()})
        return searchParams.get("id");
    };
    const selectedDeckId = getIdOrZero(searchParams.get("id"));
    const selectedDeck = useMemo(() => {
        return decks.get(selectedDeckId)
    }, [selectedDeckId, decks])
    const [token, _] = useState(localStorage.getItem(bonanza_token))
    const toastContext = useContext(ToastContext);
    const newDeckRef = useRef(null);  // needed for the tip popover
    const [userHasNoDecks, setUserHasNoDecks] = useState(false);

    const getDecks = () => {
        async function fetchDecks() {
            let res;
            try {
                res = await fetchFromBackend(config.DECK_OWNER_ENDPOINT, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
            } catch (e) {
                showToast("There was a problem getting decks", toastContext);
                return;
            }
            const data: Deck[] = await res.json();
            if (data.length === 0) {
                setUserHasNoDecks(true);
                return;
            }
            setUserHasNoDecks(false);
            let keys: Array<number> = [];
            let mappedData = new Map<deckId, Deck>();
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let e = data[i];
                    e.FlashCards?.sort((a, b) => a.ID - b.ID);
                    if (e.FlashCards) {
                        for (let j = 0; j < e.FlashCards?.length; j++) {

                            let card = e.FlashCards[j];
                            card.Answers?.sort((a, b) => a.ID - b.ID);
                        }
                    }
                    keys.push(e.ID);
                    mappedData.set(e.ID, e);
                }
            }
            keys.sort((x, y) => x - y);
            setDeckKeys(keys);
            setDecks(mappedData)
        }
        fetchDecks();
    }
    const saveAndGetDecks = (newDeck: Deck) => {
        newDeck.FlashCards?.forEach(fc =>{
            if (fc.ID < 0){
                fc.ID = 0;
            }
            fc.Answers?.forEach(answer =>{
                if (answer.ID < 0){
                    answer.ID = 0;
                }
            });
        });

        const url = `${config.BACKEND_HOST_LOCATION}/api/deck`;

        fetch(url, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newDeck)

            }
        ).then(() => getDecks());
    }

    useEffect(getDecks, [])

    const mappedDecks = deckKeys.map(value => {
            const currentDeck = decks.get(value);
            if (currentDeck) {
                const buttonVariant = currentDeck.ID === selectedDeckId ? "secondary" : "outline-secondary"
                return (
                    <Row key={value}>
                        <Button variant={buttonVariant} className="mb-1" onClick={() => {
                            setSelectedDeckId(value);
                        }}>{currentDeck.Description}</Button>
                    </Row>
                )
            }
        }
    )

    const updateDeck = (newDeck: Deck) => {
        decks.set(newDeck.ID, newDeck);
        setDecks(new Map(decks));
        // We're going to update our local copy of the decks and then get the data again.
        // This should allow our stuff to be more responsive.
        saveAndGetDecks(newDeck);
    }

    const createDeck = async () => {
        try {
            await fetchFromBackend(config.DECK_ENDPOINT, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "Id": 0,
                    "Description": "New description",
                    "Flashcards": [],
                })

            })
        } catch (e) {
            showToast("There was an error creating a new deck.", toastContext);
            return;
        }
        getDecks();
    }

    return (
        <Container fluid className="mt-1">
            <Row>
                <Col xs="auto" m={6}>
                    <Container>
                        {mappedDecks}
                        <Row>
                            <Button ref={newDeckRef} variant="dark" className="mt-1" onClick={() => {createDeck()}}>New Deck</Button>
                            <Overlay target={newDeckRef.current} show={userHasNoDecks} placement="bottom">
                                {(props) => (
                                    <Popover {...props}>
                                        <Popover.Header>
                                            <b>TIP!</b>
                                        </Popover.Header>
                                        <Popover.Body>
                                            Click this button to create your first deck!
                                        </Popover.Body>
                                    </Popover>
                                )}
                            </Overlay>
                        </Row>
                    </Container>
                </Col>
                <Col xs="auto" md="auto">
                    <Container>
                        {selectedDeck && <DeckEdit deck={copyDeck(selectedDeck)} updateDeck={updateDeck}/>}
                    </Container>
                </Col>

            </Row>
        </Container>
    )
}
