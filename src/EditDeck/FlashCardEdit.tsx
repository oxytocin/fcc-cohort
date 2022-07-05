import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Answer, FlashCard} from "../types/BackendModels";


interface FlashCardEditInterface {
    flashcard: FlashCard
    deleteCard: Function
    addAnswer: Function
    updateDeckFunc: Function
}


export const FlashCardEdit: React.FC<FlashCardEditInterface> = ({flashcard, updateDeckFunc, addAnswer, deleteCard}) => {
    const question = flashcard.Question;
    return (
        <>
            <Row className="text-start mb-3">
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
                    <Button className="ms-2"
                            onClick={() => deleteCard()}
                    >Delete Card</Button>
                    <Button className="ms-2"
                            onClick={() => addAnswer()}
                    >Add Answer</Button>
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
                    <span key={id}>
                        <hr/>
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
                                <textarea value={answer.value} style={{width: "100%"}} onChange={(event) => {
                                    const newText = event.target.value;
                                    const newAnswer = {...answer, value: newText};
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
                    </span>
                )
            })}
        </>
    )
}
