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
            .then(data => console.log(data)) // This will need to be pushed into some state so it can be used in other places
    }, []);

    return (
        <>
            "You signed in! You may now close this window!"
        </>
    )
}

export default OauthRedirect;
