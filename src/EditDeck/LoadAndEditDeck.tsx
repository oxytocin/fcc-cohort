import React, {useContext, useEffect, useMemo, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {copyDeck, copyFlashcard, Deck} from "../types/BackendModels";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {DeckEdit} from "./DeckEdit";
import {ToastContext} from "../App";
import {showToast} from "../utils";

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
    const [decks, setDecks] = useState<Array<Deck>>([]);
    const toastContext = useContext(ToastContext);


    const setSelectedDeckId = (id: number) => {
        setSearchParams({id: id.toString()})
        return searchParams.get("id");
    };

    const selectedDeckId = getIdOrZero(searchParams.get("id"));

    const selectedDeck = useMemo(() => {
        const filtered = decks.filter(value => value.ID === selectedDeckId);
        if (filtered.length > 0) {
            return filtered[0];
        }
        return null;
    }, [selectedDeckId, decks])

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
                if (data) {
                    setDecks(data);
                }
            }
        ).catch(err => {
                console.error("error is: ", err);
                alert(err);
            }
        );
    }

    const saveAndGetDecks = (newDeck: Deck) => {
        if (newDeck.ID < 0) {
            newDeck.ID = 0;
        }
        console.log("outputing new deck: ", newDeck);
        newDeck.FlashCards?.forEach(fc => {
            if (fc.ID < 0) {
                fc.ID = 0;
            }
            if (fc.DeckId < 0) {
                fc.DeckId = 0
            }
            fc.Answers?.forEach(answer => {
                if (answer.ID < 0) {
                    answer.ID = 0;
                }
                if (answer.flashCardId < 0) {
                    answer.flashCardId = 0;
                }
            });
        });

        const url = `${config.BACKEND_HOST_LOCATION}/api/deck`;
        const token = localStorage.getItem(bonanza_token);

        fetch(url, {
                method: (newDeck.ID == 0 ? "POST" : "PUT"),
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

    const mappedDecks = decks.map(value => {
            // const currentDeck = decks.get(value);
            const currentDeckArr = decks.filter(d => d.ID === value.ID)
            if (currentDeckArr.length > 0) {
                const currentDeck = currentDeckArr[0];
                return (
                    <Row key={value.ID}>
                        <button onClick={() => {
                            setSelectedDeckId(value.ID);
                        }}>{currentDeck.Description}</button>
                    </Row>

                )
            } else {
                return (<>
                </>)
            }
        }
    )

    const updateDeck = (newDeck: Deck) => {
        const newDeckArr = decks.map(deck => {
            if (deck.ID === newDeck.ID) {
                return newDeck;
            }
            return deck;
        })

        setDecks(newDeckArr);
        // We're going to update our local copy of the decks and then get the data again.
        // This should allow our stuff to be more responsive.
        saveAndGetDecks(newDeck);
    }
    const addEmptyDeck = () => {
        const res = decks.filter(value => value.ID <= 0)
        if (res.length === 0) {
            showToast("Adding Empty Deck", toastContext);
            const tempDeckId = -1;
            const newDeck: Deck = {
                Description: "New Deck",
                FlashCards: [],
                ID: tempDeckId,
                OwnerId: 0
            };
            setDecks([newDeck, ...decks]);
            setSelectedDeckId(tempDeckId)

        } else {
            showToast("Empty Deck already exists", toastContext);
        }


    }
    console.log("decks: ", decks);
    return (
        <Container fluid>
            <Row>
                <Col xs="auto" m={6}>
                    <Container>
                        <button className="btn btn-primary btn-lg btn-block mt-3"
                                onClick={addEmptyDeck}
                        >Add Deck
                        </button>
                        {mappedDecks}
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
