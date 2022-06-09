import React, {useState, useEffect} from 'react';
import {ChoiceBox} from "./ChoiceBox";
import {Container, Row} from "react-bootstrap";
import {config, bonanza_token} from "../Constants";

interface Choice {
    title: string;
    content: string;
}



export const SetChoice: React.FC = () => {
    const placeHolder: Choice[] = [];
    const [choices, setChoices] = useState(placeHolder);
    async function fetchUserDecks() {
        let response;
        const url = `${config.BACKEND_HOST_LOCATION}/api/deck/owner`;
        const token = localStorage.getItem(bonanza_token);
        try {
            response = await fetch(url, {
                method: "GET", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
        } catch (e) {
            alert("Network error encountered");
            return [{title: "", content: ""}];
        }
        if (response.status >= 400 && response.status < 600) {
            alert("Server error encountered")
            return [{title: "", content: ""}];
        }
        const decks = await response.json();
        let allChoices: Choice[] = [];
        for (let i=0; i<decks.length; i++) {
            allChoices.push({title: decks[i].Description, content: decks[i].Description});
        }
        setChoices(allChoices);
    }

    useEffect(() => {
        fetchUserDecks();
    }, [])

    return (
        <div className={"container"}>
            <Container>
                <Row data-cy="all-decks">
                    {choices.map(value => (
                        <ChoiceBox title={value.title} content={value.content}/>
                        ))}
                </Row>
            </Container>
        </div>
    );
}


