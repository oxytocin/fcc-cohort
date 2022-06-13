import React from 'react';
import {Button, ListGroup, ListGroupItem, OverlayTrigger} from "react-bootstrap";
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';

export const QuestionList: React.FC<{ questions: {question: string}[], deck: string }> = ({questions, deck}) => {

    const renderDeleteButton = (props: any) => (
                <Button variant="danger" {...props} onClick={deleteQuestion}>-</Button>
    )

    function selectQuestion() {
        return null // "get question id" for editing and updating question
    }

    function deleteQuestion() {
        return null // question id should be selected already, send "delete question" request
    }

    return (
        <div className="bg-secondary question-block overflow-auto p-4">
            <AccordionHeader>{deck}</AccordionHeader>
            <AccordionBody>
                <ListGroup data-cy="question-list" variant="flush" className="w-100">
                    {questions.map(value => (
                        <OverlayTrigger trigger="focus" placement="right" overlay={renderDeleteButton}>
                        <ListGroupItem className="question-list text-truncate" action onClick={selectQuestion}>
                            {value.question}
                        </ListGroupItem>
                        </OverlayTrigger>
                    ))}                 
                </ListGroup>
            </AccordionBody>
        </div>
    )
}