import {bonanza_token, config} from "../Constants"
import {Button} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import "./Login.css";

// Curl version of how to use the bearer. basically you'll just need to add this to a header
// curl localhost:8088/restricted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjE5NTcxMzZ9.RB3arc4-OyzASAaUhC2W3ReWaXAt_z2Fd3BN4aWTgEY"
// so just add the header 'Authorization' and then use the value 'Bearer <token>'
const Login = () => {
    const token = localStorage.getItem(bonanza_token) ?? "";

    function tokenValid(token: string): boolean {
        if (token === undefined || token === "") {
            return false;
        }
        const decoded:{"exp":string} = jwtDecode(token);
        const expiration = parseInt(decoded.exp);
        return (Date.now() < expiration * 1000);
    }

    if (tokenValid(token)) {
        window.location.href = config.CREATE_OR_JOIN;
    }

    const connectClick = () => {
        const url = `${config.REDIRECT_URL}?client_id=${config.CLIENT_ID}` +
            `&redirect_uri=${config.OAUTH_FRONTEND_REDIRECT_URL}&response_type=${config.RESPONSE_TYPE}`
        window.location.href = url

    }
    return (
        <div className="Login">
            <Button variant="dark" data-cy="connect" onClick={connectClick}>Log in with Google</Button>
        </div>
    )
}

export default Login;
