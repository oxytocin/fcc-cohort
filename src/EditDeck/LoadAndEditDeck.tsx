import React, {useEffect, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {Deck} from "../types/BackendModels";
import {Accordion, Button, Container} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import {QuestionList} from "./QuestionList";
import {DeckElement} from "./DeckElement";


export const LoadAndEditDeck: React.FC = () => {
    const [decks, setDecks] = useState<Array<Deck> | null>(null)

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
        <Container>
            <button onClick={() => getDecks()}>REFRESH</button>
            <h2>Flashcard Questions</h2>
            {decks?.map(
                (deck, idx) => <DeckElement deck={deck} idx={idx}/>
            )}
            <Button onClick={() => alert("joe goes woo hoo")}
                    variant="success" type="submit">Save Deck and Return</Button>
        </Container>
    )
}

