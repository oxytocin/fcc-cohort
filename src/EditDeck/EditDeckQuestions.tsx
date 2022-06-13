import React, {useState, useEffect} from 'react';
import {Container, Accordion, Row, Col, Form, Button, InputGroup, FormControl} from "react-bootstrap";
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import { QuestionList } from './QuestionList';
import { EditQuestion } from './EditQuestion';

import { deckData } from './deckData';


interface Questions {
    question: string
}

interface AnsValues {
    question: string,
    ansValues: string[],
    correct: boolean
}

interface QuestionAndAnswers {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
    Question: string;
    DeckId: number;
    Answers: Answers[]
}

interface Answers {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
    name: string;
    value: string;
    isCorrect: boolean;
    "flashCardId ": number;
}



export const EditDeckQuestions: React.FC = () => {
    
    let initQuestions: Questions[] = []
    deckData.FlashCards.forEach((value) => initQuestions.push({question: value.Question}))

    const editPlaceholder = {
        question: "",
        answers: [""] // this needs to include isCorrect booleans...
    }
    const [toEdit, setToEdit] = useState(editPlaceholder)
    const [deckDesc, setDeckDesc] = useState(deckData.Description)
    const [questions, setQuestions] = useState(initQuestions);
    const [answerInput, setAnswerInput] = useState([
        {}
    ])



    
    function saveDeckAndReturn() {
        return null // save/update deck
    }

    return (
        <Container>
            <Form>
                <Accordion>
                    <h1>Edit Deck Description</h1>
                    <InputGroup>
                        <FormControl aria-label="Text input" 
                            type="txt" 
                            placeholder={deckData.Description === '' ? "Enter Deck Description" : deckData.Description}
                            onChange={e => setDeckDesc(e.target.value)} />
                    </InputGroup>
                    <h2>Flashcard Questions</h2>
                    <AccordionItem eventKey="1">
                        <QuestionList questions={questions} deck={deckDesc} />
                    </AccordionItem>
                    <AccordionItem eventKey="2">
                        <EditQuestion editQuestion={toEdit.question} answers={toEdit.answers} />
                    </AccordionItem>
                </Accordion>
                <p>Done Editing?</p>
                <Button onClick={saveDeckAndReturn} variant="success" type="submit" >Save Deck and Return</Button>
            </Form>
        </Container>
    )
}