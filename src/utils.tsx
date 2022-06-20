import {useContext} from "react";
import {Toast} from "react-bootstrap";
import {ToastContext} from "./App";
import {config} from "./Constants";

export async function fetchFromBackend(endpoint: string, options: {}) {
    let response;
    const url = `${config.BACKEND_HOST_LOCATION}/${endpoint}`;
    try {
        response = await fetch(url, options);
    } catch (e) {
        throw e;
    }
    if (response.status >= 400 && response.status < 600) {
        throw new Error("ServerError");
    }
    return response;
}

export function ToastAlert() {
    const toastContext = useContext(ToastContext);
    return (
        <Toast show={toastContext.toastShow} onClose={() => {
                toastContext.setToastShow(false);
            }
        }>
            <Toast.Header>
                <strong className="me-auto">Alert</strong>
            </Toast.Header>
            <Toast.Body>{toastContext.toastText}</Toast.Body>
        </Toast>
    )
}

export function showToast(text: string, toastContext: any) {
    toastContext.setToastText(text);
    toastContext.setToastShow(true);
}
