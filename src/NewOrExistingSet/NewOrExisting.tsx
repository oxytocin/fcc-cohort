import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';

export function NewOrExisting() {
    return (
        <div className="container">
            <Container>
                <Row>
                    <div>
                    <h1>As host, you choose the question set.</h1>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Button variant="dark" size="lg" href="#">Create New Set</Button>
                        <p className="font-italic">Type your own question set</p>
                    </Col>
                    <Col>
                        <Button variant="dark" size="lg" href="#">Existing Set</Button>
                        <p className="font-italic">Choose from existing sets</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}