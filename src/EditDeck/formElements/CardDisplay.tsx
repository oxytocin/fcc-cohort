import React, {useEffect, useState} from 'react';
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {Answer, FlashCard} from "../../types/BackendModels";
import {AnswerDisplay} from "./AnswerDisplay";

interface CardDisplayInterface {
    flashCard: FlashCard
    // id: number,
    // cardQuestion: string,
}


export const CardDisplay: React.FC<CardDisplayInterface> = ({flashCard}) => {
    const [question, setQuestion] = useState<string>("")
    const [card, setCard] = useState<FlashCard | null>(null)
    const [answers, setAnswers] = useState<Array<Answer>>([])

    useEffect(() => {
        setCard(flashCard);
        setQuestion(flashCard.Question);
        if (flashCard.Answers) {
            setAnswers(flashCard.Answers)
        }

    }, [flashCard])

    if (card) {
        const id = card.ID;
        return (
            <Form.Group key={id} as={Row} className="mb-3" controlId={"formDescription-" + id}
                        style={{textAlign: "left"}}>
                <Form.Label column sm="2" className="text-left">
                    Card ID: {id}
                </Form.Label>
                <Col sm="10">
                    <Row className="mb-3">
                        <Form.Label column sm="2" className="text-left">
                            Card ID: {id}
                        </Form.Label>
                        <Col sm="10">
                            <FormControl size="lg"
                                         type="text"
                                         placeholder="Question"
                                         value={question}
                                         onChange={event => {
                                             setQuestion(event.target.value);
                                         }}
                            />
                        </Col>
                    </Row>
                    {answers.map(answer => (
                        <Row key={answer.ID}>
                            <AnswerDisplay answer={answer}/>
                        </Row>

                    ))}
                </Col>
            </Form.Group>
        )
    }


    return <></>
}
