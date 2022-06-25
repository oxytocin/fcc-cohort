import React, {useEffect, useState} from 'react';
import {FlashCard} from "../../types/BackendModels";
import {Accordion, FormControl} from "react-bootstrap";
import {FlashcardAccordionItem} from "./FlashcardAccordionItem";

interface FormFlashCardInterface {
    flashCards: Array<FlashCard>,
}

export const FlashcardAccordion: React.FC<FormFlashCardInterface> = ({flashCards}) => {
    const [allCards, setAllCards] = useState<Array<FlashCard>>([])

    useEffect(() => {
        setAllCards(flashCards);
    }, [flashCards])

    return (
        <>
            <Accordion defaultActiveKey="0" className="mb-3">
                {
                    allCards.map(
                        (card, idx) => (
                            <FlashcardAccordionItem card={card} idx={idx}/>
                        )
                    )
                }
            </Accordion>
        </>
    )
}
