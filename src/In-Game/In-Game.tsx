import React, {useState} from 'react';
import {ProgressBar, Container, Card, Row, Col, Spinner, Stack, ToggleButton} from 'react-bootstrap';
import Countdown from 'react-countdown';
import data from './in-game-data';

// A way to shuffle the answers
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: {}[]) {
    let currentIndex = data.Answers.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    };
    return array
}
shuffle(data.Answers);

// Date.now's must be outside of component function so they don't re-render and restart on each state update
const userTime = Date.now() + 10000; // <--- this number to be determined by host
const bufferTime = userTime + 5000; // default buffer time between questions

function InGame() {

    const alphabet = ["A","B","C","D"]; // for assigning answer card labels
    const correctAns = data.Answers.map(item => item.IsCorrect);
    const ansHeader = document.getElementsByClassName("Answer-card-header");

    // TIMER FUNCTIONS //
    // Renderer callback with condition
    const timer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
      if (completed) {
        // Render answer results and do the following //////////// STATE SHOULD NOT BE UPDATED UNDER THIS CHILD COMPONENT, NOR SHOULD IT BE UPDATED UNDER A CONDITION. but idk how exactly to do it otherwise.
        checkAns();
        setDisabledState(true);
        displayCorrect(ansHeader);
        setIndicatorState("outline-dark");
        //addPoints; some way to add a point for a correct answer
        return <Completionist />;
      } else {
        // Render the Question countdown
        return <Stack direction="horizontal">
                <Spinner animation="grow" variant="secondary" size="sm" className="mx-2"/>
                <span className="mx-auto">{seconds} sec...</span>
                <Spinner animation="grow" variant="secondary" size="sm" className="mx-2"/>
            </Stack>;
      }
    };
    // Render a buffer countdown
    const Completionist = () => <div><Countdown date={bufferTime} renderer={buffer}/></div>;
    const buffer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
        if (completed) {
                        ////////////// LOAD NEXT QUESTION HERE???
            return <span>next question load</span>;
        } else {
            return <span>Next Question in...{seconds}</span>;
        }
    };

    // evaluates user's input against IsCorrect answer data
    const checkAns = () => {
        for (let i = 0; i < correctAns.length; i++) {
            if (!correctAns[i] === (checkedState[i])) {
                console.log("incorrect")
                return false
            }
        }
        console.log("correct!")
        return true
    };

    // changes answer cards to indicate correct answer after time expires
    const displayCorrect = (elements: HTMLCollection) => {
        for (let i = 0; i < elements.length; i++) {
            const elementClass = elements[i].classList;
            if (correctAns[i] === true) {
                elementClass.remove("bg-light");
                elementClass.add("bg-success");
            }
        };
    };

//  const [userScore, setUserScore] = useState(0);
    const [disabledState, setDisabledState] = useState(false);
    const [indicatorState, setIndicatorState] = useState("outline-secondary");
    const [checkedState, setCheckedState] = useState( new Array(data.Answers.length).fill(false) );

//// https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    const handleOnChange = (position: number) => {
      const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    console.log("actual ans: " + correctAns);   // logs the IsCorrect Values provided by the Answer array (for verification only)
    console.log("checked: " + checkedState);    // logs the user's selected answer choices (for verification)
//  console.log("userScore: " + userScore)      // logs the user's score (for verification)

    return (
    <div className="pt-5">
        <Container fluid="md">
            <Row className="mt-md-5 pt-5" > {/* Progress and Timer */}
                <Col md={4}>
                    <ProgressBar animated variant="dark" now={(3/15)*100} /> {/* replace 3/15 with {QuesNumber}/{deck.length} */}
                    <h3 className="text-start">Question {3} of {15}</h3>
                    </Col>
                <Col md={{span:3, offset:5}}>
                    <h3 className="rounded rounded-pill bg-dark text-white">
                        <Countdown date={userTime} renderer={timer}/>
                    </h3>
                </Col>
            </Row>
            <Row> {/* Question Data */}
                <h1 className="col-md-8 offset-md-2 text-break word-break">
                {data.Question}
                </h1>
            </Row>
            {/* Answer Choices Data */}
            <Row md={2} className="mt-md-4">
                {data.Answers.map((item, i) => {
                    return(
                    <Col xs={12}>
                        <ToggleButton id={alphabet[i]} type="checkbox" className="w-100"
                        key={i}
                        variant={indicatorState}
                        value={item.Id}
                        checked={checkedState[i]}
                        disabled={disabledState}
                        onChange={() => handleOnChange(i)}>
                        <Card bg="dark" text="white">
                            <Card.Header as="h2" className="Answer-card-header rounded bg-light">{alphabet[i]}</Card.Header>
                            <Card.Body>
                              <Card.Text as="h3" id="a-txt">
                                {item.Name}
                              </Card.Text>
                            </Card.Body>
                        </Card></ToggleButton>
                    </Col>
                    );
                })}
            </Row>
        </Container>
    </div>
    )
}

export default InGame;