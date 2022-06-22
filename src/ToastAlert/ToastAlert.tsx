import {useContext} from "react";
import {Toast} from "react-bootstrap";
import {ToastContext} from "../App";

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

