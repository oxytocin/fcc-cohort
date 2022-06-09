import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {bonanza_token, config} from "../Constants";
import {Deck} from "../types/BackendModels";

const secondary = 'secondary';
export const ExistingDecks: React.FC<{ selectedDeck: Deck }> = ({selectedDeck}) => {

    if (selectedDeck.FlashCards && selectedDeck.FlashCards.length > 0) {
        const mappedElements = selectedDeck.FlashCards.map(value => (
            <span key={value.ID}>
                <Card.Header>{value.Question}</Card.Header>
            </span>
        ));
        return (
            <Card
                bg={secondary}
                text={'dark'}
                style={{width: '18rem'}}
                className="mb-2">
                {mappedElements}
            </Card>
        )
    }
    return (
        <Card
            bg={secondary}
            text={'dark'}
            style={{width: '18rem'}}
            className="mb-2">
        </Card>
    )
}
