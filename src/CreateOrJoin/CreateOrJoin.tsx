import {Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import {bonanza_token, config} from "../Constants";
import {useNavigate} from 'react-router-dom'

function CreateOrJoin() {
    let token = localStorage.getItem(bonanza_token) ?? ""
    const decoded:{"firstName":string} = jwtDecode(token)
    let user = decoded.firstName
    const navigate = useNavigate();

    function getRoomID() {
        const roomIDElement = document.getElementById("roomID") as HTMLInputElement;
        return roomIDElement.value;
    }

    return (
        <>
            <header data-cy="header" className="CreateOrJoinHeader fw-bold">Flashcard Bonanza</header>
            <h3 data-cy="greeting" className="mb-4 fst-italic fw-light">Welcome, {user}! What would you like to do?</h3>
            <Row>
                <Col sm={5}>
                    <Button onClick={()=>{navigate(config.CHOOSE_SET_PATH)}} data-cy="host-btn" variant="dark" size="lg" className="m-1 col-12">Host room</Button> {/* Am I a bad boy for hardcoding this path? */}
                </Col>
                <Col sm={7}>
                    <InputGroup size="lg" className="m-1">
                        <FormControl id="roomID" type="text" placeholder="Room ID" className="border border-dark rounded" />
                        <Button onClick={()=>{navigate("/waiting-room", {state: {roomID: getRoomID(), isAdmin: false}})}} data-cy="join-btn" variant="dark" size="lg">Join room</Button>
                    </InputGroup>
                </Col>
            </Row>
        </>
    );
}

export default CreateOrJoin;
