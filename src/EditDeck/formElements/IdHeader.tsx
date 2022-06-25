import React from "react";
import {Col, Form, FormControl, Row} from "react-bootstrap";

interface IdHeaderInterface {
    id: number,
    ownerId: number
}

export const IdHeader: React.FC<IdHeaderInterface> = ({id, ownerId}) => (
    <Form.Group as={Row} className="mb-3" controlId="formDeckId" style={{textAlign: "left"}}>
        <Form.Label column sm="2" className="text-left">
            Deck ID
        </Form.Label>
        <Col sm="4">
            <FormControl size="lg" type="text" placeholder="Deck ID" disabled
                         value={id}/>
        </Col>

        <Form.Label column sm="2" className="text-left">
            Owner ID
        </Form.Label>
        <Col sm="4">
            <FormControl size="lg" type="text" placeholder="Deck ID" disabled
                         value={ownerId}/>
        </Col>
    </Form.Group>
)
