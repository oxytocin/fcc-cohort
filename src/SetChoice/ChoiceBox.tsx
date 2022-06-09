import React from "react";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export const ChoiceBox: React.FC<{ title: string, content: string, id:number, del: Function }> = ({title, content,id,del}) => {
    const navigate = useNavigate();

    return (
        <Card border="dark" style={{width: '18rem'}} className="m-2">
            <Card.Body>
                <Card.Title data-cy="card-title">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text data-cy="card-content">
                    {content}
                </Card.Text>
                <Card.Link href="#">Start Game</Card.Link>
                <Card.Link onClick={()=>navigate(`/edit-deck#${id}`)} className="text-success" href="#">Edit Deck</Card.Link><br/>
                <Card.Link onClick={()=>del()} className="text-danger" href="#">Delete Deck</Card.Link>
            </Card.Body>
        </Card>
    );
}
