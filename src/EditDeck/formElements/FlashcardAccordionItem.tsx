import React, {useState} from 'react';
import {Accordion, Card, Col, FormControl, Row, useAccordionButton} from "react-bootstrap";
import {FlashCard} from "../../types/BackendModels";
import {AnswerAccordionItem} from "./AnswerAccordionItem";

interface FlashcardAccordionItemInterface {
    card: FlashCard
    idx: number
}

// function CustomToggle({children, eventKey}: { children: any, eventKey: string }) {
function CustomToggle({eventKey}: { eventKey: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(eventKey === "0");
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setIsOpen(!isOpen)
    );

    return (
        <button
            type="button"
            style={{backgroundColor: 'pink', marginLeft: "2px", width:"100%"}}
            onClick={decoratedOnClick}
        >{isOpen ? "Close" : "Open"}
        </button>
    );
}

export const FlashcardAccordionItem: React.FC<FlashcardAccordionItemInterface> = ({card, idx}) => {

    const eKey = idx.toString();
    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col sm={10}>
                        <FormControl type="text" size="lg" value={card.Question}/>
                    </Col>
                    <Col sm={2}>
                        <CustomToggle eventKey={eKey} />
                    </Col>
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={eKey}>
                <Card.Body>
                    {
                        card.Answers?.map(value => {
                            const keyValue = value.ID.toString();
                            return (
                                <AnswerAccordionItem key={keyValue} answer={value} eventKey={keyValue}/>
                            );
                        })
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
