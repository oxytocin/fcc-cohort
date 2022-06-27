import React, {useState, useEffect, useContext} from 'react';
import {ChoiceBox} from "./ChoiceBox";
import {Container, Row} from "react-bootstrap";
import {config, bonanza_token} from "../Constants";
import {fetchFromBackend, showToast} from "../utils";
import { ToastContext } from '../App';

interface Choice {
    title: string;
    content: string;
    id: number;
}

export const SetChoice: React.FC = () => {
    const toastContext = useContext(ToastContext);
    const placeHolder: Choice[] = [];
    const [choices, setChoices] = useState(placeHolder);

    async function fetchUserDecks() {
        let response;
        const token = localStorage.getItem(bonanza_token);
        try {
            response = await fetchFromBackend(config.DECK_OWNER_ENDPOINT, {
                method: "GET", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
        } catch (e) {
            showToast("Error fetching decks", toastContext);
            return [{title: "", content: ""}]
        }
        const decks = await response.json();
        let allChoices: Choice[] = [];
        for (let i = 0; i < decks.length; i++) {
            console.log(decks[i]);
            allChoices.push({
                title: decks[i].Description, content: decks[i].Description, id: decks[i].ID
            });
        }
        setChoices(allChoices);
    }

    useEffect(() => {
        fetchUserDecks().then(value => console.log("decks pulled"));
    }, [])

    const deleteById = async (id: number) => {
        const token = localStorage.getItem(bonanza_token);
        try {
            await fetchFromBackend(`${config.DECK_ENDPOINT}/${id}`, {
                method: "DELETE", mode: "cors", headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
        } catch (e) {
            showToast("Error removing deck", toastContext);
        }
        const newChoices = choices.filter(value => value.id !== id);
        setChoices(newChoices);
    };

    return (
        <div className={"container mt-5"}>
            <Container>
                <Row data-cy="all-decks">
                    {choices.map(value => (
                        <ChoiceBox title={value.title} content={value.content} key={value.id} deckID={value.id}
                                   del={() => deleteById(value.id)}/>
                    ))}
                </Row>
            </Container>
        </div>
    );
};


