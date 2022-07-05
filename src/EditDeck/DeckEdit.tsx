import React, {useEffect, useState} from 'react';
import {copyFlashcard, Deck, FlashCard} from "../types/BackendModels";
import {Button, Col, Row} from "react-bootstrap";
import {FlashCardEdit} from "./FlashCardEdit";


interface DeckEditInterface {
    deck: Deck
    updateDeck: Function
}

export const DeckEdit: React.FC<DeckEditInterface> = ({deck, updateDeck}) => {
    const [currentDeck, setCurrentDeck] = useState(deck);
    const [updated, setUpdated] = useState(false);
    const description = currentDeck.Description;
    const updateStatefulDeckAndUpdateStatus = (deckFunc: Function) => {
        setCurrentDeck(deckFunc(currentDeck, setUpdated));
    }
    useEffect(() => {
        setCurrentDeck(deck);
        setUpdated(false);
    }, [deck]);

    const addCardToDeck = () => {
        updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
            setUpdated(true);
            const oldCards = oldDeck.FlashCards ? oldDeck.FlashCards : [];
            oldDeck.FlashCards = [...oldCards, {
                ID: oldCards.length * -1,
                Answers: [],
                DeckId: oldDeck.ID,
                DeletedAt: undefined,
                Question: "",
            }]
            const newDeck = {...oldDeck}
            return newDeck;
        })
    }
    const commitButton = (
        <Button variant={"danger"} onClick={event => {
            updateDeck(currentDeck);
            setUpdated(false);
        }}>
            Commit Changes
        </Button>)
    return (
        <>
            <Row className="mb-5 text-start">
                <Col sm="2"> Deck ID: {currentDeck.ID} </Col>
                <Col sm="8">
                    Description:
                    <input type="text"
                           className="w-100"
                           value={description}
                           onChange={(event) => {
                               updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                                   setUpdated(true);
                                   const newDeck = {...oldDeck, Description: event.target.value}
                                   return newDeck;
                               })
                           }}
                    />
                </Col>
                <Col sm="2">
                    <Button className="mb-3"
                            onClick={() => addCardToDeck()}
                    >Add FlashCard</Button>
                    {updated ? commitButton : <Button variant="success" disabled>No Changes to Commit</Button>}
                </Col>
            </Row>
            {currentDeck.FlashCards?.map((card, idx, cards) => {
                    const id = card.ID;

                    const updateHigherFunc = (newCard: FlashCard) => {
                        for (let i = 0; i < cards.length; i++) {
                            if (cards[i].ID === id) {
                                cards[i] = newCard;
                                updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                                    setUpdated(true);
                                    return {...oldDeck};
                                });
                            }
                        }
                    };
                    const deleteCard = () => {

                        updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                            console.log("CARDS: ",oldDeck.FlashCards);
                            setUpdated(true);
                            oldDeck.FlashCards = cards.filter(value => value.ID !== id);
                            console.log("CARDS: ",oldDeck.FlashCards);
                            return {...oldDeck};
                        })
                    }

                    const addAnswer = (flashCardId: number) => {
                        updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                            setUpdated(true);
                            cards
                                .filter(flashCard => flashCard.ID === id)
                                .forEach(flashCard => {
                                    const oldAnswers = flashCard.Answers ? flashCard.Answers : [];
                                    const newAnswer = {
                                        ID: oldAnswers.length * -1,
                                        name: "",
                                        value: "",
                                        isCorrect: false,
                                        flashCardId: flashCardId
                                    }
                                    flashCard.Answers = [...oldAnswers, newAnswer];

                                })
                            return {...oldDeck};
                        })
                    }

                    return (
                        <div style={{border: "1px solid", padding: "5px"}} key={id}>
                            <FlashCardEdit
                                addAnswer={addAnswer}
                                deleteCard={deleteCard}
                                flashcard={copyFlashcard(card)}
                                updateDeckFunc={updateHigherFunc}/>
                        </div>
                    )
                }
            )}

        </>
    );
}
