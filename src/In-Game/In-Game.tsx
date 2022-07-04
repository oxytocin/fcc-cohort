import {useEffect, useState, useRef, useContext} from 'react';
import {ProgressBar, Container, Card, Row, Col, Spinner, Stack, ToggleButton} from 'react-bootstrap';
import Countdown from 'react-countdown';
import {displayCorrect, unmarkCorrect, checkAns}from './in-game-funcs';
import {useLocation} from "react-router-dom";
import {FlashCard} from "../types/BackendModels";
import {useNavigate} from "react-router-dom";
import {GameContext} from "../App";
import "./InGame.css";

const alphabet = ["A","B","C","D","E","F"];
const ansHeader = document.getElementsByClassName("Answer-card-header");

function InGame() {
    const [card, setCard] = useState(0) // card is the question index of the shuffled deck
    interface LocationStateInterface {
        timeLimit: number,
        flashCards: Array<FlashCard>
    }
    const locationState = useLocation().state as LocationStateInterface;
    const flashCards = locationState.flashCards;
    const timeLimit = locationState.timeLimit;
    const [userScore, setUserScore] = useState(0);
    const [userTime, setUserTime] = useState(Date.now() + timeLimit)
    const [display, setDisplay] = useState({answerDisabled: false, indicator: "outline-secondary"})
    const [checkedState, setCheckedState] = useState(new Array(flashCards[card].Answers.length).fill(false));
    const checkedRef = useRef(checkedState) // must use Ref to relay updated information to the setTimeout function
    checkedRef.current = checkedState;
    const correctAns = flashCards[card].Answers.map(item => item.isCorrect); // user answers are checked against this
    const bufferTime = userTime + 5000; // default buffer time between questions
    const navigate = useNavigate();
    const gameContext = useContext(GameContext);

    useEffect(() => {
        //@ts-ignore
        gameContext.ws.onmessage = (e: MessageEvent) => {
            const json = JSON.parse(e.data);
            let finalScores: Array<any> = gameContext.finalScores;
            finalScores.push({
                username: json.username,
                score: json.score,
            });
            gameContext.setFinalScores(finalScores);
            navigate("/summary");
        }
    }, [])

    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
              index === position ? !item : item
          );
          setCheckedState(updatedCheckedState);
      }

    useEffect(()=> {
        const timeIsUp = setTimeout(()=> {
            setDisplay({answerDisabled: true, indicator: "outline-dark"})
            displayCorrect(ansHeader, correctAns);
            if (checkAns(correctAns, checkedRef.current) === true) {
                setUserScore(userScore + 1)
            }
        }, timeLimit);
        return () => clearTimeout(timeIsUp)
    }, [bufferTime]);

    useEffect(()=> {
        const next = setTimeout(()=> {
            if (card < flashCards.length - 1) {
                setCard(card+1)
                setCheckedState(new Array(flashCards[card+1].Answers.length).fill(false))
                setDisplay({answerDisabled: false, indicator: "outline-secondary"})
                setUserTime(Date.now() + timeLimit)
                unmarkCorrect(ansHeader)
            } else {
                return null // the state of the game shouldn't reach this line... if so it's an error
            }
        }, timeLimit+5000);
        return () => clearTimeout(next)
    }, [bufferTime])

    // TIMER FUNCTIONS https://www.npmjs.com/package/react-countdown
    const timer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
      if (completed) {
        return <BuffTimer />; // Returns the buffer timer between questions
      } else {
        // Render the Question countdown
        return <Stack direction="horizontal">
                <Spinner animation="grow" variant="secondary" size="sm" className="mx-2"/>
                <span data-cy="timer" className="mx-auto">{seconds} sec...</span>
                <Spinner animation="grow" variant="secondary" size="sm" className="mx-2"/>
            </Stack>;
      }
    };

    const BuffTimer = () => <div><Countdown date={bufferTime} renderer={buffer}/></div>;

    const buffer = ({seconds, completed }: {seconds:number, completed:boolean}) => {
        if (completed) {
            // at this point, we have run out of cards and the session is over
            const toSend = JSON.stringify({
                action: "SUBMIT", message: userScore.toString()
            });
            //@ts-ignore
            gameContext.ws.send(toSend);  // triggers onmessage, sends user to summary
            return <span><Spinner animation="border" variant="light" className="mx-2"/></span>;
        } else {
                // if the card count has reached the deck length display a loading spinner, else display "Next Question"
            if (card === flashCards.length - 1) {
                return <span><Spinner animation="border" variant="light" className="mx-2"/></span>
            } else {
                return <span data-cy="buffer">Next Question: {seconds}</span>;
            }
        }
    };

    return (
    <div className="InGame pt-5">
        <Container fluid="md">
            <Row className="mt-md-5 pt-5" > {/* Progress and Timer */}
                <Col md={4}>
                    <ProgressBar data-cy="progress" animated variant="dark" now={( (card+1) / flashCards.length)*100} />
                    <h3 data-cy="ques-num" className="text-start">Question {card+1} of {flashCards.length}</h3>
                    <h4 data-cy="score" className="text-start">Score: {userScore}</h4>
                    </Col>
                <Col md={{span:4, offset:4}}>
                    <h3 className="rounded rounded-pill bg-dark text-white p-1">
                        <Countdown key={card} date={userTime} renderer={timer}/>
                    </h3>
                </Col>
            </Row>
            <Row> {/* Question Data */}
                <h1 data-cy="question" className="col-md-8 offset-md-2 text-break word-break">
                {flashCards[card].Question}
                </h1>
            </Row>
            {/* Answer Choices Data */}
            <Row data-cy="answers" md={2} className="mt-md-4">
                {flashCards[card].Answers.map((item, i) => {
                    return(
                    <Col xs={12}>
                        <ToggleButton id={alphabet[i]} type="checkbox" className="w-100"
                        variant={display.indicator}
                        value={item.value}
                        checked={checkedState[i]}
                        disabled={display.answerDisabled}
                        onChange={() => handleOnChange(i)}>
                        <Card bg="dark" text="white">
                            <Card.Header as="h2" className="Answer-card-header rounded bg-light">{alphabet[i]}</Card.Header>
                            <Card.Body>
                              <Card.Text as="h3" id="a-txt">
                                {item.value}
                              </Card.Text>
                            </Card.Body>
                        </Card>
                        </ToggleButton>
                    </Col>
                    );
                })}
            </Row>
        </Container>
    </div>
    )
}

export default InGame;
