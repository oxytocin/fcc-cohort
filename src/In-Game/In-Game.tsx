import React, {useEffect, useState, useRef} from 'react';
import {ProgressBar, Container, Card, Row, Col, Spinner, Stack, ToggleButton, Button} from 'react-bootstrap';
import Countdown from 'react-countdown';
import data from './in-game-data';

// A way to shuffle the answers
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: {}[]) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    };
    return array
}

shuffle(data.Cards);
for (let i = 0; i < data.Cards.length; i++) {
    shuffle(data.Cards[i].Answers)
}

const timeLimit = 1000 * 10 // second number to be chosen by host in room, pass into here

function InGame() {
    const [card, setCard] = useState(0) // card is the question index of the shuffled deck
    const [userTime, setUserTime] = useState(Date.now() + timeLimit)
    const alphabet = ["A","B","C","D"]; // for assigning answer card labels
    const correctAns = data.Cards[card].Answers.map(item => item.IsCorrect);
    const ansHeader = document.getElementsByClassName("Answer-card-header");
    const bufferTime = userTime + 5000; // default buffer time between questions

    useEffect(()=> {
        const timeIsUp = setTimeout(()=> {
            setDisabledState(true);
            checkAns();
            displayCorrect(ansHeader);
            setIndicatorState("outline-dark");
        }, timeLimit);
        return () => clearTimeout(timeIsUp)
    }, [bufferTime]); // if userTime changes, this effect will fire again-- it's a good thing

    useEffect(()=> {
        const next = setTimeout(()=> {
            if (card < data.Cards.length - 1) {
                setCard(card+1)
                setCheckedState( new Array(data.Cards[card+1].Answers.length).fill(false) )               
                setDisabledState(false)
                setUserTime(Date.now() + timeLimit)
                setIndicatorState("outline-secondary")
                unmarkCorrect(ansHeader)
            } else {
                return null // game ends here
            }
        }, timeLimit+5000);
        return () => clearTimeout(next)
    }, [bufferTime])

    // TIMER FUNCTIONS //
    // Renderer callback with condition
    const timer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
      if (completed) {
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
            
            return <Button size="lg" variant="success" className="rounded-pill">Go To Summary</Button>;
        } else {
            if (card === data.Cards.length - 1) {
                return <span><Spinner animation="border" variant="light" className="mx-2"/></span>
            } else {
                return <span>Next Question: {seconds}</span>;
            }
        }
    };

    // evaluates user's input against IsCorrect answer data
    const checkAns = () => {
        for (let i = 0; i < correctAns.length; i++) {
            if (!correctAns[i] === (checkedRef.current[i])) {
                console.log("incorrect")
                return false
            }
        }
        setUserScore(userScore + 1)
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
    const unmarkCorrect = (elements: HTMLCollection) => {
        for (let i = 0; i < elements.length; i++) {
            const elementClass = elements[i].classList;
            elementClass.add("bg-light");
            elementClass.remove("bg-success");
        };
    };

    const [userScore, setUserScore] = useState(0);
    const [disabledState, setDisabledState] = useState(false);
    const [indicatorState, setIndicatorState] = useState("outline-secondary");
    const [checkedState, setCheckedState] = useState( new Array(data.Cards[card].Answers.length).fill(false) );
    const checkedRef = useRef(checkedState) // must use Ref to relay updated information to the setTimeout function
    checkedRef.current = checkedState

//// https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    const handleOnChange = (position: number) => {
      const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

//  console.log("checkedRef: " + checkedRef.current) // logs selected answer choices passed as references for use in setTimeout
//  console.log("actual ans: " + correctAns);   // logs the IsCorrect Values provided by the Answer array (for verification only)
//  console.log("checked: " + checkedState);    // logs the user's selected answer choices (for verification)
//  console.log("user Score: " + userScore)      // logs the user's score (for verification)

    return (
    <div className="pt-5">
        <Container fluid="md">
            <Row className="mt-md-5 pt-5" > {/* Progress and Timer */}
                <Col md={4}>
                    <ProgressBar data-cy="progress" animated variant="dark" now={( (card+1) / data.Cards.length)*100} /> {/* {QuesNumber}/{deck.length} */}
                    <h3 data-cy="ques-num" className="text-start">Question {card+1} of {data.Cards.length}</h3>
                    <h4 data-cy="score" className="text-start">Score: {userScore}</h4>
                    </Col>
                <Col md={{span:3, offset:5}}>
                    <h3 className="rounded rounded-pill bg-dark text-white">
                        <Countdown data-cy="timer" key={card} date={userTime} renderer={timer}/>
                    </h3>
                </Col>
            </Row>
            <Row> {/* Question Data */}
                <h1 data-cy="question" className="col-md-8 offset-md-2 text-break word-break">
                {data.Cards[card].Question}
                </h1>
            </Row>
            {/* Answer Choices Data */}
            <Row data-cy="answers" md={2} className="mt-md-4">
                {data.Cards[card].Answers.map((item, i) => {
                    return(
                    <Col xs={12}>
                        <ToggleButton id={alphabet[i]} type="checkbox" className="w-100"
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