import React from "react";
import {Card} from "react-bootstrap";


export const ChoiceBox: React.FC<{ title: string, content: string }> = ({title, content}) => {
    return (

        <Card border="dark" style={{ width: '18rem' }} className="m-2">
            <Card.Body>
                <Card.Title data-cy="card-title">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text data-cy="card-content">
                    {content}
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}
