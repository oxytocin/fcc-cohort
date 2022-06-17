import React from "react";
import {Deck} from "../types/BackendModels";
import {Form} from "react-bootstrap";


export const SelectedDeck: React.FC<{ selectedDeck: Deck, refresh: Function }> = ({selectedDeck, refresh}) => (
    <>
        <Form>
            <Form.Label>Deck ID</Form.Label>
            <Form.Control placeholder={selectedDeck.ID.toString()} disabled/>
        </Form>
    </>
)