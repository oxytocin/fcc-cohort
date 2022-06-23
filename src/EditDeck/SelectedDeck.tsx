import React from "react";
import {Deck} from "../types/BackendModels";
import {Button, Form} from "react-bootstrap";

interface SelectedDeck {
    selectedDeck: Deck,
    refresh: Function,
    allDecks: Map<number, Deck> | null,
    setDecks: Function,
}


export const SelectedDeck: React.FC<SelectedDeck> = ({selectedDeck, refresh, allDecks, setDecks}) => {
    // We need to be able to edit the current de
    /*
        Need the following

        1. View the current deck and all the corresponding pieces
        2. Update the current deck's flashcards including removal and addition
        3. ensure that a click event is handled and we're showing a different deck upon changes.
        4. Should there be a state that handles changes? Like upon a change we update certain things but only
event: MouseEvent<HTMLButtonElement>
     */
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(selectedDeck.ID.toString());
    }

    return (
        <>
            <Form>
                <Form.Label>Deck ID</Form.Label>
                <Form.Control placeholder={selectedDeck.ID.toString()} disabled/>
                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
