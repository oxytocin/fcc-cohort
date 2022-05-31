import React, {useEffect} from "react";

function OauthRedirect() {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        const url = "http://127.0.0.1:9000/login";
        fetch(url, {
            method: "POST", mode: "cors",
            body: code
        }).then(response => response.json())
            .then(data => {
                // for the rest of the session, the token can be accessed with
                // localStorage.getItem("bonanaza-token")
                localStorage.setItem("bonanza-token", data.token);
                window.location.href = "http://127.0.0.1:3000/create-or-join"
            })
    }, []);

    return (
        <>
            "You signed in! You may now close this window!"
        </>
    )
}

export default OauthRedirect;
