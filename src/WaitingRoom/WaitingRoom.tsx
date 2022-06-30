import React, {useContext, useEffect, useState} from 'react';
import {Form, InputGroup, Col, Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import clipboard from "../icons/clipboard.svg";
import './WaitingRoom.css'
import {useLocation, useNavigate} from "react-router-dom";
import {bonanza_token, config} from "../Constants";
import {showToast} from '../utils';
import {ToastContext} from "../App";
import {GameContext} from "../App";

function WaitingRoom() {
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Copied!
        </Tooltip>
    );

    async function copyId(e: React.MouseEvent) {
        e.preventDefault();
        const el = document.getElementById("inlineFormInput") as HTMLInputElement;
        await navigator.clipboard.writeText(el.placeholder)
    }

    const toastContext = useContext(ToastContext);
    const gameContext = useContext(GameContext);
    const [timeLimit, setTimeLimit] = useState<number>();
    const [userNames, setUserNames] = useState<string[]>();
    interface LocationStateInterface {
        roomID: string,
        isAdmin: boolean,
        deckID: string
    }
    const locationState = useLocation().state as LocationStateInterface;
    const deckID = locationState.deckID;
    const roomID = locationState.roomID;
    const isAdmin = locationState.isAdmin;
    const startButtonStyle = {
        display: isAdmin ? "inline-block" : "none",
    }
    const token = localStorage.getItem(bonanza_token)
    const navigate = useNavigate();
    const [deck, setDeck] = useState();

    useEffect(() => {
        gameContext.setWs(new WebSocket(`${config.BACKEND_WS_LOCATION}/ws/${roomID}?token=${token}`))
    }, [])

    useEffect(() => {
        // don't want this to run before ws has actually updated
        if (gameContext.ws === undefined) {return;}

        function handleMessage(dataFromBackend: string) {
            const json = JSON.parse(dataFromBackend);
            switch (json["message_type"]) {
                case "initial-connection":
                    break;
                case "user-joined":
                    const userObjects = json["contents"];
                    let userNamesArr: string[] = [];
                    for (let i=0; i<userObjects.length; i++) {
                        userNamesArr.push(userObjects[i].username);
                    }
                    setUserNames(userNamesArr);
                    break;
                case "questions":
                    setDeck(json.deck);
                    break;
            }
        }
        gameContext.ws.onclose = () => {
            showToast("Connection dropped. You may have tried to join a room that does not exist", toastContext);
            navigate("/create-or-join")
        }

        gameContext.ws.onmessage = (e: MessageEvent) => {handleMessage(e.data);}
    }, [gameContext.ws])

    useEffect(() => {
        if (deck === undefined) {return;}
        //@ts-ignore
        gameContext.setTotalQuestions(deck.length)
        navigate("/in-game", {state: {
            timeLimit: timeLimit, flashCards: deck
        }})
    }, [deck])

    return (
        <div className="WaitingRoom"> 
            <h1 className="fw-bold mb-3">Room Code</h1>
            <Col xs="auto">
                <Form className="align-items-center m-2">
                    <InputGroup>
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>Clipboard</Form.Label>                   
                    <Form.Group>
                        <Form.Control id="inlineFormInput" type="text" readOnly placeholder={roomID}/>
                    </Form.Group>
                    
                        <OverlayTrigger trigger="click" placement="bottom" overlay={renderTooltip}>
                            <InputGroup.Text><input type="image" src={clipboard} onClick={copyId}/></InputGroup.Text>
                        </OverlayTrigger>
                    </InputGroup>
                </Form>
            </Col>
            <Col xs="auto">
                <Form className="align-items-center mt-2">
                    <h5 className="mt-5 fw-bold">Time per question</h5>
                    <InputGroup>
                        <Form.Group>
                            <Form.Control id="inlineFormInput2" type="text" placeholder="Time in seconds"/>
                        </Form.Group>
                        <InputGroup.Text className="bg-secondary text-light">Seconds</InputGroup.Text>
                    </InputGroup>
                </Form>
            </Col>
            <Button
                variant="outline-dark"
                className="mt-5 border-2 col-8"
                size="lg"
                style={startButtonStyle}
                onClick={() => {
                    if (gameContext.ws === undefined) {return;}
                    const timeInput = document.getElementById("inlineFormInput2") as HTMLInputElement;
                    if (Number.isNaN(parseInt(timeInput.value))) {
                        showToast("Time per question must be a number.", toastContext);
                        return;
                    }
                    setTimeLimit(parseInt(timeInput.value) * 1000);
                    const toSend = JSON.stringify(
                        {action: "LOAD", deckId: deckID}
                    )
                    gameContext.ws.send(toSend);
                }}>
                <b>Start Game</b>
            </Button>
            <div className="usersJoinedDiv">
                <h3 className="waitingRoomText mt-4">Users Joined</h3>
                <p className="waitingRoomText">{userNames}</p>
            </div>
        </div>
    )
}

export default WaitingRoom
