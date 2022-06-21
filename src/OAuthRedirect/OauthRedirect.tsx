import React, {useContext, useEffect} from "react";
import {config, bonanza_token} from "../Constants"
import {useNavigate} from "react-router-dom"
import {fetchFromBackend, showToast} from "../utils";
import {ToastContext} from "../App";

function OauthRedirect() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");

        async function fetchToken() {
            let response;
            try {
                response = await fetchFromBackend(config.LOGIN_ENDPOINT, {
                    method: "POST", mode: "cors", body: code
                })
            } catch (e) {
                showToast("There was an error logging in", toastContext);
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
