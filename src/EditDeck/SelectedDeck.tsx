import React, {useEffect, useState} from "react";
import {Deck, FlashCard} from "../types/BackendModels";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {IdHeader} from "./formElements/IdHeader";
import {FormDescription} from "./formElements/FormDescription";
import {FlashcardAccordion} from "./formElements/FlashcardAccordion";

interface SelectedDeckInterface {
    selectedDeck: Deck,
    refresh: Function,
    allDecks: Map<number, Deck> | null,
    setDecks: Function,
}


export const SelectedDeck: React.FC<SelectedDeckInterface> = ({selectedDeck, refresh, allDecks, setDecks}) => {
    const [description, setDescription] = useState<string>("")
    const ownerId = selectedDeck.OwnerId;
    const [flashcards, setFlashcards] = useState<Array<FlashCard>>([]);
    /*
        Need the following

        1. View the current deck and all the corresponding pieces
        2. Update the current deck's flashcards including removal and addition
        3. ensure that a click event is handled and we're showing a different deck upon changes.
        4. Should there be a state that handles changes? Like upon a change we update certain things but only
event: MouseEvent<HTMLButtonElement>
     */

    useEffect(() => {
        setDescription(selectedDeck.Description);

        if (selectedDeck.FlashCards !== null && selectedDeck.FlashCards) {
            setFlashcards(selectedDeck.FlashCards);
        }

    }, [selectedDeck])

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <>
            <Form>
                <IdHeader id={selectedDeck.ID} ownerId={ownerId}/>
                <FormDescription description={description} setDescription={setDescription}/>
                <FlashcardAccordion flashCards={flashcards}/>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >Submit</Button>
            </Form>
        </>
    )
}
