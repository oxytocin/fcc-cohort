import React from 'react';
import {ChoiceBox} from "./ChoiceBox";
import {Col, Container, Row} from "react-bootstrap";

interface Choice {
    title: string;
    content: string;
}

export const SetChoice: React.FC = () => {
    let allChoices: Choice[] = [
        {title: "This is a title", content: "This is a content"},
        {title: "This is a title2", content: "This is a content2"},
        {title: "This is a title3", content: "This is a content3"},
        {title: "This is a title4", content: "This is a content4"},
        {title: "This is a title5", content: "This is a content5"},
        {title: "This is a title6", content: "This is a content6"},
        {title: "This is a title7", content: "This is a content7"},
    ];


    return (
        <div className={"container"}>
            <Container>
                <Row>
                        {allChoices.map(value => (
                            <ChoiceBox title={value.title} content={value.content}/>
                        ))}
                </Row>
            </Container>
        </div>
    );
}


