import React, {useState} from 'react';
import {Button, Row, Col, Form, InputGroup, FormControl} from "react-bootstrap";
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';

export const EditQuestion: React.FC<{ editQuestion: string, answers: string[] }> = ({editQuestion, answers}) => {
    const [btnVariant, setBtnVariant] = useState({variant: "success", addRemove: "+"})


    function ButtonContext() {

        return (<Button variant={btnVariant.variant} onClick={addAnswer}>{btnVariant.addRemove}</Button>)
    }

    function addAnswer() {
        return (
            <InputGroup className="mb-3">
                <ButtonContext/>
                <FormControl aria-label="Text input"/>
                <InputGroup.Checkbox aria-label="Checkbox for marking answer correct"/>
            </InputGroup>)
    }

    function handleSubmit() {
        return null // saves all question data to deck
    }

    return (
        <div className="bg-secondary question-block overflow-auto p-4">
            <AccordionHeader>{editQuestion}</AccordionHeader>
            <AccordionBody>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <ButtonContext/>
                        <FormControl aria-label="Text input"
                                     type="text"
                                     placeholder="Add an answer choice"
                        />
                        <InputGroup.Text>Correct?</InputGroup.Text>
                        <InputGroup.Checkbox aria-label="Checkbox for marking answer correct"/>
                    </InputGroup>
                    <Button variant="dark" type="submit">Save Flashcard</Button>
                </Form>
            </AccordionBody>
        </div>
    )
}
