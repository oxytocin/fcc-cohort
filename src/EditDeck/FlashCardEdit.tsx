import React from 'react';
import {Button, Col, Row, CloseButton} from "react-bootstrap";
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
            <Row className="align-items-between">
                <Col className="text-start me-auto">
                    <span>Flashcard ID: {flashcard.ID}</span>
                </Col>
                <Col> 
                    <CloseButton className="float-end"
                        onClick={() => {deleteCard()}}>
                    </CloseButton>
                </Col>
            </Row>
            <Row className="text-start mb-3">
                <Col sm={12} className="mt-1">
                    Question: <input type="text" className="mb-1" value={question} onChange={
                    event => {
                        const qUpdate = event.target.value;
                        const newCard = {...flashcard, Question: qUpdate}
                        updateDeckFunc(newCard);
                    }
                }/>
                    <Button className="ms-2" size="sm"
                            onClick={() => addAnswer()}
                    >Add Answer</Button>
                </Col>
            </Row>
            <AnswerMap flashcard={flashcard} updateDeckFunc={updateDeckFunc}/>
        </>
    )
}

interface AnswerMapInterface {
    flashcard: FlashCard
    updateDeckFunc: Function
}

const AnswerMap: React.FC<AnswerMapInterface> = ({flashcard, updateDeckFunc}) => {
    return (
        <>
            {flashcard.Answers && flashcard.Answers.map((answer, index, allAnswers) => {
                const id = answer.ID;
                //const answerName = answer.name;
                const updateAnswerFunc = (newAnswer: Answer) => {
                    for (let i = 0; i < allAnswers.length; i++) {
                        if (allAnswers[i].ID === id) {
                            allAnswers[i] = newAnswer;
                            const newCard = {...flashcard};
                            updateDeckFunc(newCard);

                        }
                    }
                }
                const removeAnswerFunc = () => {
                    flashcard.Answers = allAnswers.filter(value => value.ID !== id);
                    const newCard = {...flashcard};
                    updateDeckFunc(newCard);

                }
                return (
                    <AnswerElement key={id} id={id} answer={answer} //answerName={answerName}
                                   updateAnswerFunc={updateAnswerFunc} removeAnswerFunc={removeAnswerFunc}/>
                )

            })}
        </>)
}

interface AnswerElementInterface {
    id: number
    answer: Answer
    //answerName: string
    updateAnswerFunc: Function
    removeAnswerFunc: Function
}

const AnswerElement: React.FC<AnswerElementInterface> = ({
                                                             id,
                                                             answer,
                                                             //answerName,
                                                             updateAnswerFunc,
                                                             removeAnswerFunc
                                                         }) => {
    const buttonChoice = (isCorrect: boolean) => (isCorrect === true
            ? <input type="checkbox" checked onChange={() => {
                const newAnswer = {...answer, isCorrect: false};
                updateAnswerFunc(newAnswer)
            }}/>
            : <input type="checkbox" onChange={() => {
                const newAnswer = {...answer, isCorrect: true};
                updateAnswerFunc(newAnswer)
            }}/>
    )
    return (
        <span key={id}>
            <hr/>
            <Row className="align-items-between">
                <Col className="text-start">
                    Answer ID: {id}
                </Col>
                <Col>
                    <CloseButton className="float-end" onClick={() => removeAnswerFunc()}></CloseButton>
                </Col>
            </Row>
            <Row className="mb-1">
                <Col sm={10} className="text-start">
                    Answer: &nbsp;
                    {/*<input type="text" value={answerName} className="mb-1" onChange={*/}
                        {/*event => {*/}
                            {/*const nameUpdate = event.target.value;*/}
                            {/*const newAnswer = {...answer, name: nameUpdate};*/}
                            {/*updateAnswerFunc(newAnswer);*/}
                        {/*}}*/}
                    {/*}}/>*/}
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
                    <>Correct?&nbsp;
                        {buttonChoice(answer.isCorrect)}
                    </>
                </Col>
            </Row>
        </span>
    )
}
