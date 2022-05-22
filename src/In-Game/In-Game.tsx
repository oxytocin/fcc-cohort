import React, {useState} from 'react';
import {ProgressBar, Container, Card, Row, Col, Spinner, Stack, ToggleButton} from 'react-bootstrap';
import Countdown from 'react-countdown';

const sampleAnswers = [{
                     answer_id:1222,
                     name: "FALSE 2",
                     value: "string",
                     is_correct:false
                   },
                   {
                     answer_id:1223,
                     name: "FALSE 1",
                     value: "string",
                     is_correct:false
                   },
                   {
                     answer_id:1224,
                     name: "CORRECT 1",
                     value: "string",
                     is_correct:true
                   },
                   {
                     answer_id:1225,
                     name: "CORRECT 2",
                     value: "string",
                     is_correct:true
                   }];
    // A way to shuffle the answers
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: {}[]) {
    let currentIndex = sampleAnswers.length,  randomIndex;
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
shuffle(sampleAnswers);

// Date.now's must be outside of component function so they don't re-render and restart on each state update
const userTime = Date.now() + 10000; // <--- this number to be determined by host
const bufferTime = Date.now() + 5000; // default buffer time between questions

function InGame() {

    const alphabet = ["A","B","C","D"]; // for assigning answer card labels

    // TIMER FUNCTION
    // Renderer callback with condition
    const timer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
      if (completed) {
        // Render a completed state and do the following
        checkAns();
            //ansIndicator(); some way to disable checkboxes and outline correct answers in green, incorrect in red
            //addPoints; some way to add a point for a correct answer
        return <Completionist />;
      } else {
        // Render a countdown
        return <Stack direction="horizontal">
                <Spinner animation="grow" variant="danger" size="sm" className="mx-2"/>
                <span className="mx-auto">{seconds} sec...</span>
                <Spinner animation="grow" variant="danger" size="sm" className="mx-2"/>
            </Stack>;
      }
    };
    // Render a buffer countdown
    const Completionist = () => <div>
        <Countdown date={bufferTime} renderer={buffer}/>
        </div>;
    // What happens after buffer countdown?
    const buffer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
        if (completed) {
        // LOAD NEXT QUESTION HERE???
            return <span>next question load</span>;
        } else {
            return <span>Next Question in...{seconds}</span>;
        }
    }

    function checkAns() {
        const correctAns = sampleAnswers.map(item => item.is_correct);
        console.log(correctAns); // logs the is_correct values provided by the Answer array (for verification)

        for (let i = 0; i < sampleAnswers.length; i++) {
            if (!correctAns[i] === (checkedState[i])) {
                return console.log("incorrect")
            }
        }
        return console.log("correct!")
    };
            // NEEDS WORK, goal is to outline correct and incorrect cards and disable checkboxes
//     function ansIndicator() {
//       const wrong = document.querySelectorAll('value="false"');
//       const right = document.querySelectorAll('value="true"');
//       wrong.forEach(element => {
//         element.removeAttribute('variant')
//       })
//       right.forEach(element => {
//         element.removeAttribute('variant')
//       })
//     };

            // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    const [checkedState, setCheckedState] = useState(
        new Array(sampleAnswers.length).fill(false)
    );

    const handleOnChange = (position: number) => {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    }

    console.log(checkedState)     // logs the user's selected answer choices (for verification)

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
                This is a sample Question. This will serve as a starting point, ok?
                </h1>
            </Row>
            {/* Answer Choices Data */}
            <Row md={2} className="mt-md-4">
                {sampleAnswers.map((item, i) => {
                    return(
                    <Col xs={12}>
                        <ToggleButton id={alphabet[i]} value={item.is_correct.toString()} variant="outline-success" type="checkbox" className="w-100"
                        checked={checkedState[i]}
                        onChange={() => handleOnChange(i)}>
                        <Card bg="dark" text="white">
                            <Card.Header as="h2" className="Answer-card-header rounded">{alphabet[i]}</Card.Header>
                            <Card.Body>
                              <Card.Text as="h3" id="a-txt">
                                {item.name}
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