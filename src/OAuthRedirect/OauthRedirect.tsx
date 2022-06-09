import React, {useEffect} from "react";
import {config, bonanza_token} from "../Constants"
import {useNavigate} from "react-router-dom"

function OauthRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        const url = config.OAUTH_BACKEND_REDIRECT_URL;
        async function fetchToken() {
            let response;
            try {
                response = await fetch(url, {
                    method: "POST", mode: "cors", body: code
                });
            } catch (e) {
                alert("Network error encountered while logging in.");
                navigate("/");
                return;
            }
            if (response.status >= 400 && response.status < 600) {
                alert("Server error encountered while logging in.")
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
