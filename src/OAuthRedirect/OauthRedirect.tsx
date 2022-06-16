import React, {useEffect} from "react";
import {config, bonanza_token} from "../Constants"
import {useNavigate} from "react-router-dom"
import {fetchFromBackend} from "../utils";

function OauthRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        console.log("auth info:",config.OAUTH_BACKEND_REDIRECT_URL)

        async function fetchToken() {
            let response;
            try {
                response = await fetchFromBackend(config.LOGIN_ENDPOINT, {
                    method: "POST", mode: "cors", body: code
                })
            } catch (e) {
                navigate("/");
                return;
            }
            const data = await response.json();
            localStorage.setItem(bonanza_token, data.token);
            window.location.href = config.CREATE_OR_JOIN;
        }
        fetchToken();
    }, []);

    return (
        <div data-cy="auth-confirm">
            We're signing you in, DON'T CLOSE THIS WINDOW!
        </div>
    )
}

export default OauthRedirect;
