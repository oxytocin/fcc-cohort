import {Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import {bonanza_token, config} from "../Constants";
import {useNavigate} from 'react-router-dom'
import "./CreateOrJoin.css"
import logo2 from "../assets/logos/White-logo-no-background.png"

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
        <div className="CreateOrJoin background">
            {/* <header data-cy="header" className="CreateOrJoinHeader fw-bold">Flashcard Bonanza</header> */}
            <img data-cy="display-logo" src={logo2} style={{maxWidth: "50%", minWidth: "240px", height: "auto"}} alt="Flashcard Bonanza logo" />
            <h3 data-cy="greeting" className="mb-4 mt-3 fst-italic fw-light text-center">Welcome, {user}! What would you like to do?</h3>
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
        </div>
    );
}

export default CreateOrJoin;
