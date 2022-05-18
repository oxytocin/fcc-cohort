import React, {useState} from 'react';
import {ProgressBar, Container, Card, Row, Col, Badge, Spinner, ToggleButton} from 'react-bootstrap';

function InGame() {
    const [radioValue, setRadioValue] = useState('');

    return (
    <div>
        <Container fluid="md">
            <Row className="mt-md-5"> {/* Progress and Timer */}
                <Col md={4}>
                    <ProgressBar animated variant="dark" now={(3/15)*100} /> {/* replace 3/15 with {currentQues}/{totalQues} */}
                    <h3 className="text-start">Question {3} of {15}</h3>
                    </Col>
                <Col md={{span:3, offset:5}}>
                    <h3 className="rounded rounded-pill bg-dark text-white">
                        {/* need timer function */}{10} seconds left <Spinner animation="border" variant="light" />
                    </h3>
                </Col>
            </Row>
            <Row> {/* Question */}
                <h1 className="col-md-8 offset-md-2 text-break word-break">
                This is a sample Question. This will serve as a starting point, ok?
                </h1>
            </Row>
            {/* Answer Choices */}
            <Row md={2} className="mt-md-4">
                <Col xs={12}>
                    <ToggleButton id="ans-a" value="A" variant="outline-secondary" type="radio" className="w-100"
                    checked={radioValue === "A"}
                    onChange={e => setRadioValue(e.currentTarget.value)}>
                    <Card bg="dark" text="white">
                      <Card.Header as="h2" className="Answer-card-header rounded">A</Card.Header>
                      <Card.Body>
                        <Card.Text as="h3" id="a-txt">
                          This is a sample answer, and I think it might be correct...
                        </Card.Text>
                      </Card.Body>
                    </Card></ToggleButton>
                </Col>
                <Col xs={12}>
                    <ToggleButton id="ans-b" value="B" variant="outline-secondary" type="radio" className="w-100"
                    checked={radioValue === "B"}
                    onChange={e => setRadioValue(e.currentTarget.value)}>
                    <Card bg="dark" text="white">
                      <Card.Header as="h2" className="Answer-card-header rounded">B</Card.Header>
                      <Card.Body>
                        <Card.Text as="h3" id="b-txt">
                          This is a sample answer, I don't think this one is right.
                        </Card.Text>
                      </Card.Body>
                    </Card></ToggleButton>
                </Col>
            </Row>
            <Row md={2} className="mt-md-4">
                <Col xs={12}>
                    <ToggleButton id="ans-c" value="C" variant="outline-secondary" type="radio" className="w-100"
                    checked={radioValue === "C"}
                    onChange={e => setRadioValue(e.currentTarget.value)}>
                    <Card bg="dark" text="white" className="w-100">
                      <Card.Header as="h2" className="Answer-card-header rounded">C</Card.Header>
                      <Card.Body>
                        <Card.Text as="h3" id="c-txt">
                          This is a sample answer, this one is correct!
                        </Card.Text>
                      </Card.Body>
                    </Card></ToggleButton>
                </Col>
                <Col xs={12}>
                    <ToggleButton id="ans-d" value="D" variant="outline-secondary" type="radio" className="w-100"
                    checked={radioValue === "D"}
                    onChange={e => setRadioValue(e.currentTarget.value)}>
                    <Card bg="dark" text="white">
                      <Card.Header as="h2" className="Answer-card-header rounded">D</Card.Header>
                      <Card.Body>
                        <Card.Text as="h3" id="d-txt">
                          This is a sample answer and to be honest, I have no idea what's going on.
                        </Card.Text>
                      </Card.Body>
                    </Card></ToggleButton>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default InGame;