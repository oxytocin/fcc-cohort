import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';

export function NewOrExisting() {
    return (
        <div className="container">
            <Container>
                <Row>
                    <div>
                    <h1 data-cy="describe-host">As host, you choose the question set.</h1>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Button data-cy="create-btn" variant="dark" size="lg" href="#">Create New Deck</Button>
                        <p data-cy="describe-create" className="font-italic">Type your own question set</p>
                    </Col>
                    <Col>
                        <Button data-cy="existing-btn" variant="dark" size="lg" href="#">Existing Deck</Button>
                        <p data-cy="describe-existing" className="font-italic">Choose from existing sets</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}