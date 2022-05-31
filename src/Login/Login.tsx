import React from "react";
import {config} from "../Constants"

// Curl version of how to use the bearer. basically you'll just need to add this to a header
// curl localhost:8088/restricted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjE5NTcxMzZ9.RB3arc4-OyzASAaUhC2W3ReWaXAt_z2Fd3BN4aWTgEY"
// so just add the header 'Authorization' and then use the value 'Bearer <token>'
const Login = () => {
    const connectClick = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=849784468632-n9upp7q0umm82uecp5h3pfdervht7sjg.apps.googleusercontent.com&redirect_uri=${config.OAUTH_REDIRECT_URL}&response_type=code&scope=openid profile email`;
        // rather than open a popup, we redirect to Google's authentication
        // That way, the token can be saved and will persist in
        // localStorage (see OauthRedirect.tsx)
        window.location.href = url
    }
    return <button onClick={connectClick}>Connect</button>
}

export default Login;
