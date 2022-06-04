import React, {useEffect} from "react";
import {config} from "../Constants"
function OauthRedirect() {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        const url = config.OAUTH_BACKEND_REDIRECT_URL;
        fetch(url, {
            method: "POST", mode: "cors",
            body: code
        }).then(response => response.json())
            .then(data => {
                // for the rest of the session, the token can be accessed with
                // localStorage.getItem("bonanaza-token")
                localStorage.setItem("bonanza-token", data.token);
                window.location.href = config.CREATE_OR_JOIN;
            })
    }, []);

    return (
        <div data-cy="auth-confirm">
            We're signing you in, DON'T CLOSE THIS WINDOW!
        </div>
    )
}

export default OauthRedirect;
