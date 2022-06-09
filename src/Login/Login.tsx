import React from "react";
import {bonanza_token, config} from "../Constants"
import {Button} from "react-bootstrap";

// Curl version of how to use the bearer. basically you'll just need to add this to a header
// curl localhost:8088/restricted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjE5NTcxMzZ9.RB3arc4-OyzASAaUhC2W3ReWaXAt_z2Fd3BN4aWTgEY"
// so just add the header 'Authorization' and then use the value 'Bearer <token>'
const Login = () => {
    const localToken = localStorage.getItem(bonanza_token)
    if (localToken != undefined && localToken !== ""){
        window.location.href = config.CREATE_OR_JOIN
    }

    const connectClick = () => {
        const url = `${config.REDIRECT_URL}?client_id=${config.CLIENT_ID}` +
            `&redirect_uri=${config.OAUTH_FRONTEND_REDIRECT_URL}&response_type=${config.RESPONSE_TYPE}`
        console.log("auth info url for redirect: ", url)
        window.location.href = url

    }
    return <Button variant="dark" data-cy="connect" onClick={connectClick}>Log in with Google</Button>
}

export default Login;
