import { useContext } from "react";
import { ToastContext } from "./App";
import {config} from "./Constants";

export async function fetchFromBackend(endpoint: string, options: {}) {
    let response;
    const url = `${config.BACKEND_HOST_LOCATION}/${endpoint}`;
    try {
        response = await fetch(url, options);
    } catch (e) {
        // TODO: toast
        document.body.appendChild(document.createElement("DIV"))
        throw e;
    }
    if (response.status >= 400 && response.status < 600) {
        // TODO: toast
        throw new Error("ServerError");
    }
    return response;
}

export function changeText() {
    const toastContext = useContext(ToastContext);
    toastContext.toastText = "lol";
}

export function Dummy() {
    const toastContext = useContext(ToastContext);
    return (
        <p>{toastContext.toastText}</p>
    )
}
