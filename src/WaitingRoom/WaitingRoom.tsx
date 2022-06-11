import React, { useEffect, useState } from 'react';
import {Form, InputGroup, Col, Row, Tooltip, OverlayTrigger} from "react-bootstrap";
import clipboard from "../icons/clipboard.svg";
import './WaitingRoom.css'
import {useLocation} from "react-router-dom";
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
            const usersJson = JSON.parse(dataFromBackend);
            let userNamesArr: string[] = [];
            for (let [_, value] of Object.entries(usersJson)) {
                //@ts-ignore
                userNamesArr.push(value);
            }
            setUserNames(userNamesArr);
        }

        ws.onmessage = (e: MessageEvent) => {updateUserNames(e.data)}
    }, [])

    return (
        <div className="WaitingRoom"> 
            <h1>Room Code</h1>
            <Form>
                <Row className="align-items-center">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>Clipboard</Form.Label>
                    <Col xs="auto">
                        <Form.Group>
                            <Form.Control id="inlineFormInput" type="text" readOnly placeholder={roomID}/>
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <InputGroup>
                            <OverlayTrigger trigger="click" placement="right" overlay={renderTooltip}>
                                <InputGroup.Text><input type="image" src={clipboard} onClick={copyId}/></InputGroup.Text>
                            </OverlayTrigger>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
            <div className="usersJoinedDiv">
                <h3 className="waitingRoomText mt-5">Users Joined</h3>
                <p className="waitingRoomText">{userNames}</p>
            </div>
        </div>
    )
}

export default WaitingRoom
