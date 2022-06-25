import React from 'react';
import {Answer} from "../../types/BackendModels";
import {Col, Form, FormControl} from "react-bootstrap";

interface AnswerDisplayInterface {
    answer: Answer
}

export const AnswerDisplay: React.FC<AnswerDisplayInterface> = ({answer}) => {

    return (
        <>
            <Form.Label column sm="2" className="text-left">
                Card ID:
            </Form.Label>
            <Col sm="10">
                <FormControl size="lg" type="text" placeholder="Answer ID" value={answer.ID} disabled/>
            </Col>
        </>
    )
}
