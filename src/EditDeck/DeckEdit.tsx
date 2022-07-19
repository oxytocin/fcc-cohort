import React, {useEffect, useState} from 'react';
import {copyFlashcard, Deck, FlashCard} from "../types/BackendModels";
import {Button, Col, Row} from "react-bootstrap";
import {FlashCardEdit} from "./FlashCardEdit";


interface DeckEditInterface {
    deck: Deck;
    updateDeck: Function;
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
            return {...oldDeck};
        })
    }
    const commitButton = (
        <Button className="mb-3" variant={"danger"} onClick={event => {
            updateDeck(currentDeck);
            setUpdated(false);
        }}>
            Commit Changes
        </Button>)
    return (
        <>
            <div className="border border-dark ps-1 pe-1 mb-3">
                <Row className="text-start">
                    <Col sm="auto" className="mb-1"> Deck ID: {currentDeck.ID} </Col>
                    <Col sm="auto" className="mb-1">
                        Description:
                        <input type="text"
                            className="w-100"
                            value={description}
                            onChange={(event) => {
                                updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                                        setUpdated(true);
                                        const newDeck = {...oldDeck, Description: event.target.value}
                                        return newDeck;
                                    }
                                )
                            }}
                        />
                    </Col>
                        <Col>
                            <Button className="mb-2 mt-1" variant="danger">Delete Deck</Button>
                        </Col>
                </Row>
                <Row className="align-items-start">
                    <Col>
                        <Button className="mb-3 me-1"
                                onClick={() => addCardToDeck()}
                        >Add Card</Button>
                        {updated ? commitButton :
                            <Button variant="secondary" className="mb-3" disabled>No Changes to Save</Button>}
                    </Col>
                </Row>
            </div>
            <FlashcardMap currentDeck={currentDeck}
                          updateDeckAndStatus={updateStatefulDeckAndUpdateStatus}/>
        </>
    );
};

interface FlashcardMapInterface {
    currentDeck: Deck;
    updateDeckAndStatus: Function
}

const FlashcardMap: React.FC<FlashcardMapInterface> = ({currentDeck, updateDeckAndStatus}) => {

    return (
        <>
            {currentDeck.FlashCards?.map((card, idx, cards) => {
                    const id = card.ID;

                    const updateHigherFunc = (newCard: FlashCard) => {
                        for (let i = 0; i < cards.length; i++) {
                            if (cards[i].ID === id) {
                                cards[i] = newCard;
                                updateDeckAndStatus((oldDeck: Deck, setUpdated: Function) => {
                                    setUpdated(true);
                                    return {...oldDeck};
                                });
                            }
                        }
                    };
                    const deleteCard = () => {
                        updateDeckAndStatus((oldDeck: Deck, setUpdated: Function) => {
                            setUpdated(true);
                            oldDeck.FlashCards = cards.filter(value => value.ID !== id);
                            return {...oldDeck};
                        })
                    }

                    const addAnswer = (flashCardId: number) => {
                        updateDeckAndStatus((oldDeck: Deck, setUpdated: Function) => {
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
                        <div key={id} className="border border-dark ps-1 pe-1 mb-1">
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
