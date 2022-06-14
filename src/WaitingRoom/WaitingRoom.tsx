import React, { useEffect, useState } from 'react';
import {Form, InputGroup, Col, Row, Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import clipboard from "../icons/clipboard.svg";
import './WaitingRoom.css'
import {useLocation, useNavigate} from "react-router-dom";
import {bonanza_token, config} from "../Constants";

function WaitingRoom() {
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Copied!
        </Tooltip>
    );

    async function copyId(e: React.MouseEvent) {
        e.preventDefault();
        // I know I shouldn't do "any" but I don't know what else to do
        const el: any = document.getElementById("inlineFormInput");
        await navigator.clipboard.writeText(el.placeholder)
    }

    const [userNames, setUserNames] = useState<string[]>();
    const location = useLocation();
    //@ts-ignore
    const roomID = location.state.roomID;  // state passed in from setChoice

    useEffect(() => {
        const token = localStorage.getItem(bonanza_token)
        const ws = new WebSocket(`${config.BACKEND_WS_LOCATION}/ws/${roomID}?token=${token}`)

        function updateUserNames(dataFromBackend: string) {
            const userObjects = JSON.parse(dataFromBackend);
            let userNamesArr: string[] = [];
            for (let i=0; i<userObjects.length; i++) {
                userNamesArr.push(userObjects[i].username);
                // TODO: get the user id from the id key, if needed
            }
            setUserNames(userNamesArr);
        }

        ws.onmessage = (e: MessageEvent) => {updateUserNames(e.data);}
    }, [])

    const navigate = useNavigate();

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
            {/*TODO: probably have to pass some state to the in-game component*/}
            <Button variant="outline-dark" className="mt-5 border-2 col-8" size="lg" onClick={() => {navigate("/in-game")}}><b>Start Game</b></Button>          
            <div className="usersJoinedDiv">
                <h3 className="waitingRoomText mt-4">Users Joined</h3>
                <p className="waitingRoomText">{userNames}</p>
            </div>
        </div>
    )
}

export default WaitingRoom
