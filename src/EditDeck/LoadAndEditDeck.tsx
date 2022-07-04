import React, {useEffect, useMemo, useState} from 'react';
import {bonanza_token, config} from "../Constants";
import {Answer, copyDeck, copyFlashcard, Deck, FlashCard} from "../types/BackendModels";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {DeckList} from "./DeckList";
import {SelectedDeck} from "./SelectedDeck";

type deckId = number;

let nullDeck: Deck = {
    ID: 0,
    CreatedAt: "",
    DeletedAt: null,
    Description: "nulldeck",
    FlashCards: null,
    OwnerId: 0,
    UpdatedAt: "",
};

function getIdOrZero(id: string | null): number {
    if (id) {
        const temp = parseInt(id, 10);
        if (!isNaN(temp)) {
            return temp;
        }
    }

    return 0;
}

export const LoadAndEditDeck: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [decks, setDecks] = useState<Map<number, Deck>>(new Map())
    const [deckKeys, setDeckKeys] = useState<Array<number>>([]);
    const setSelectedDeckId = (id: number) => {
        setSearchParams({id: id.toString()})
        return searchParams.get("id");
    };
    const selectedDeckId = getIdOrZero(searchParams.get("id"));

    const selectedDeck = useMemo(() => {
        return decks.get(selectedDeckId)
    }, [selectedDeckId, decks])

    const getDecks = () => {
        const url = `${config.BACKEND_HOST_LOCATION}/api/deck/owner`;
        const token = localStorage.getItem(bonanza_token);
        fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        ).then<Array<Deck>>(res => res.json()
        ).then((data?: Deck[]) => {
                let keys: Array<number> = [];
                let mappedData = new Map<deckId, Deck>();
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        let e = data[i];
                        e.FlashCards?.sort((a, b) => a.ID - b.ID);
                        if (e.FlashCards) {
                            for (let j = 0; j < e.FlashCards?.length; j++) {

                                let card = e.FlashCards[j];
                                card.Answers?.sort((a, b) => a.ID - b.ID);
                            }
                        }
                        keys.push(e.ID);
                        mappedData.set(e.ID, e);
                    }
                }
                keys.sort((x, y) => x - y);

                setDeckKeys(keys);
                setDecks(mappedData)

            }
        ).catch(err => {
                console.error("error is: ", err);
                alert(err);
            }
        );
    }

    useEffect(getDecks, [])
    const mappedDecks = deckKeys.map(value => {
            const currentDeck = decks.get(value);
            if (currentDeck) {
                return (
                    <Row key={value}>
                        <button onClick={() => {
                            console.log("setting this value: ", value);
                            setSelectedDeckId(value);
                        }}>{currentDeck.Description}</button>
                    </Row>

                )
            } else {
                return (<></>)
            }
        }
    )

    const updateDeck = (newDeck: Deck) => {
        // alert("NEED TO CALL API AND SAVE!!!!");
        console.log("new Deck Description", newDeck.Description);
        decks.set(newDeck.ID, newDeck);
        setDecks(new Map(decks));
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={2} m={6}>
                    <Container>
                        {mappedDecks}
                    </Container>
                </Col>
                <Col xs={10} md={6}>
                    <Container>
                        {selectedDeck && <DeckEdit deck={copyDeck(selectedDeck)} updateDeck={updateDeck}/>}
                    </Container>
                </Col>

            </Row>
        </Container>
    )
}

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
        // setUpdated(true);
    }
    useEffect(() => {
        setCurrentDeck(deck);
        setUpdated(false);
    }, [deck]);

    if (deck.FlashCards) {
        console.log(deck.FlashCards[0]);
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
                           value={description}
                           onChange={(event) => {
                               // const newDeck = {...currentDeck, Description: event.target.value}
                               updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                                   setUpdated(true);
                                   const newDeck = {...oldDeck, Description: event.target.value}
                                   return newDeck;
                               })
                           }}
                    />
                </Col>
                <Col sm="2">
                    {updated ? commitButton : <Button variant="success" disabled>No Changes to Commit</Button>}
                </Col>
            </Row>
            {deck.FlashCards?.map((card, idx, cards) => {
                    const id = card.ID;
                    const updateHigherFunc = (newCard: FlashCard) => {
                        for (let i = 0; i < cards.length; i++) {
                            if (cards[i].ID === id) {
                                cards[i] = newCard;
                                updateStatefulDeckAndUpdateStatus((oldDeck: Deck, setUpdated: Function) => {
                                    setUpdated(true);
                                    return {...oldDeck};
                                });
                                setUpdated(true);
                            }
                        }
                    };
                    return (
                        <FlashCardEdit flashcard={copyFlashcard(card)} key={id} updateDeckFunc={updateHigherFunc}/>
                    )
                }
            )}

        </>
    );
}

interface FlashCardEditInterface {
    flashcard: FlashCard
    updateDeckFunc: Function
}

const FlashCardEdit: React.FC<FlashCardEditInterface> = ({flashcard, updateDeckFunc}) => {
    const question = flashcard.Question;

    return (
        <>
            <Row className="text-start mb-3" key={flashcard.ID}>
                <Col sm={2} className="text-start">
                    <span>Flashcard ID: {flashcard.ID}</span>
                </Col>
                <Col sm={10}>
                    Question: <input type="text" value={question} onChange={
                    event => {
                        const qUpdate = event.target.value;
                        const newCard = {...flashcard, Question: qUpdate}
                        updateDeckFunc(newCard);

                    }
                }/>
                </Col>
            </Row>
            {flashcard.Answers && flashcard.Answers.map((answer, index, allAnswers) => {
                const id = answer.ID;
                const answerName = answer.name;
                const updateAnswerFunc = (newAnswer: Answer) => {
                    for (let i = 0; i < allAnswers.length; i++) {
                        if (allAnswers[i].ID === id) {
                            allAnswers[i] = newAnswer;
                            const newCard = {...flashcard};
                            updateDeckFunc(newCard);

                        }
                    }
                }


                return (
                    <>
                        <Row className="mb-3">
                            <Col sm={2} className="text-start">
                                Answer ID: {id}
                            </Col>
                            <Col sm={10} className="text-start">
                                Answer:
                                <input type="text" value={answerName} onChange={
                                    event => {
                                        const nameUpdate = event.target.value;
                                        const newAnswer = {...answer, name: nameUpdate};
                                        updateAnswerFunc(newAnswer);

                                    }
                                }/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={10} className="text-start">
                                <textarea value={answer.value}  style={{width:"100%"}} onChange={(event)=>{
                                    const newText = event.target.value;
                                    const newAnswer = {...answer, value:newText};
                                    updateAnswerFunc(newAnswer);
                                }}/>
                            </Col>
                            <Col sm={2} className="text-start">
                                {answer.isCorrect === true
                                    ? <input type="checkbox" checked onChange={() => {
                                        const newAnswer = {...answer, isCorrect: false};
                                        updateAnswerFunc(newAnswer)
                                    }}/>
                                    : <input type="checkbox" onChange={() => {
                                        const newAnswer = {...answer, isCorrect: true};
                                        updateAnswerFunc(newAnswer)
                                    }}/>
                                }

                            </Col>
                        </Row>
                    </>
                )
            })}
        </>
    )
}
