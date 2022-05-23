import React from "react";
import {config} from "../Constants"

// Curl version of how to use the bearer. basically you'll just need to add this to a header
// curl localhost:8088/restricted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjE5NTcxMzZ9.RB3arc4-OyzASAaUhC2W3ReWaXAt_z2Fd3BN4aWTgEY"
// so just add the header 'Authorization' and then use the value 'Bearer <token>'
const Login = () => {
    const connectClick = () => {
        console.log(config.OAUTH_REDIRECT_URL)
        const width = 500;
        const height = 400;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2.5;
        const title = `WINDOW TITLE`;
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=849784468632-n9upp7q0umm82uecp5h3pfdervht7sjg.apps.googleusercontent.com&redirect_uri=${config.OAUTH_REDIRECT_URL}&response_type=code&scope=openid profile email`;
        window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    }
    return <button onClick={connectClick}>Connect</button>
}

export default Login;
