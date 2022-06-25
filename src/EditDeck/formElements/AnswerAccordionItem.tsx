import React, {useState} from 'react';
import {Accordion, Card, Row, Col, FormControl, useAccordionButton} from "react-bootstrap";
import {Answer} from "../../types/BackendModels";

interface AnswerAccordionItemInterface {
    answer: Answer,
    eventKey: string,
}

// @ts-ignore
function CustomToggle({children, eventKey}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setIsOpen(!isOpen)
    );

    return (
        <button
            type="button"
            style={{backgroundColor: 'pink', marginLeft: "2px"}}
            onClick={decoratedOnClick}
        >{isOpen ? "Close" : "Open"}
            {/*{children}*/}
        </button>
    );
}

export const AnswerAccordionItem: React.FC<AnswerAccordionItemInterface> = ({answer, eventKey}) => {
    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Row>
                        <Col sm={10}>
                            <FormControl type="text" size="lg" value={answer.name}/>
                        </Col>
                        <Col sm={2}>
                            <CustomToggle eventKey={eventKey}>Open</CustomToggle>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <div>Is Correct?: {answer.isCorrect ? "true" : "false"}</div>
                        {/*<div>Value: {answer.value}</div>*/}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            {/*<Accordion.Item eventKey={eventKey}>*/}
            {/*<Accordion.Header>*/}
            {/*    <FormControl type="text" size="lg" value={answer.name}/>*/}
            {/*    <CustomToggle eventKey={eventKey}>CLICK ME!</CustomToggle>*/}
            {/*</Accordion.Header>*/}
            {/*<Accordion.Body>*/}
            {/*    <div>{answer.name}</div>*/}
            {/*</Accordion.Body>*/}
            {/*</Accordion.Item>*/}
        </Accordion>
    )
}
