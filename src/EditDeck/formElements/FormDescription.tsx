import React from "react";
import {Col, Form, FormControl, Row} from "react-bootstrap";

interface FormDescriptionInterface {
    description: string,
    setDescription: Function,
}

export const FormDescription: React.FC<FormDescriptionInterface> = ({description, setDescription}) => (
    <Form.Group as={Row} className="mb-3" controlId="formDescription" style={{textAlign: "left"}}>
        <Form.Label column sm="2" className="text-left">
            Description
        </Form.Label>
        <Col sm="10">
            <FormControl size="lg"
                         type="text"
                         placeholder="Description"
                         value={description}
                         onChange={event => {
                             setDescription(event.target.value);
                         }}
            />
        </Col>
    </Form.Group>
)
