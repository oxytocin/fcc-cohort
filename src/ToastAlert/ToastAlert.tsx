import {useContext} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {ToastContext} from "../App";

export function ToastAlert() {
    const toastContext = useContext(ToastContext);
    return (
        <ToastContainer position="bottom-center">
            <Toast bg="secondary" show={toastContext.toastShow} onClose={() => {
                    toastContext.setToastShow(false);
                }
            }>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bonanza!</strong>
                    <small>Notification</small>
                </Toast.Header>
                <Toast.Body className="text-white">{toastContext.toastText}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

