import AccordionItem from "react-bootstrap/AccordionItem";
import {QuestionList} from "./QuestionList";
import {Accordion} from "react-bootstrap";
import React from "react";
import {Deck} from "../../types/BackendModels";

export const DeckElement: React.FC<{ deck: Deck, idx: number }> = ({deck, idx}) => (
    <Accordion key={idx}>
        <AccordionItem eventKey={idx.toString()}>
            <QuestionList flashcards={deck.FlashCards} deckDescription={deck.Description}/>
        </AccordionItem>
    </Accordion>
)
