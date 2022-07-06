import React, {useEffect, useMemo, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {copyDeck, copyFlashcard, Deck} from "../types/BackendModels";
import {Col, Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {DeckEdit} from "./DeckEdit";


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
                // console.log("returned: ", JSON.stringify(data));
                // console.log("json is", data);
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
        ).catch(err => {
                console.error("error is: ", err);
                alert(err);
            }
        );
    }
    const saveAndGetDecks = (newDeck: Deck) => {
        console.log("deck ID: ",newDeck.ID)
        console.log("deck Cards: ",newDeck.FlashCards)
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
        const token = localStorage.getItem(bonanza_token);

        fetch(url, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newDeck)

            }
        // ).then(data => console.log(data)
        ).then(() => getDecks());
    }

    useEffect(getDecks, [])
    const mappedDecks = deckKeys.map(value => {
            const currentDeck = decks.get(value);
            if (currentDeck) {
                return (
                    <Row key={value}>
                        <button onClick={() => {
                            setSelectedDeckId(value);
                        }}>{currentDeck.Description}</button>
                    </Row>

                )
            } else {
                return (<></>)
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

    return (
        <Container fluid>
            <Row>
                <Col xs="auto" m={6}>
                    <Container>
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
