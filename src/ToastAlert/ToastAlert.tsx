import { Toast, ToastContainer } from 'react-bootstrap';
import React, { useState, useEffect, useCallback, createContext } from 'react';

const ToastContext = createContext((toast: string)=>{});

export default ToastContext;

export function ToastContextProvider ({ children }: any) {
    const [ toasts, setToasts ] = useState([]);

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(
                () => setToasts(toasts => toasts.slice(1)),
                5000
            );
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    const addToast = useCallback(
        function(toast: string) {
            //@ts-ignore 
            setToasts(toasts => [ ...toasts, toast ]);
        },
        [setToasts]
    );


    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer position="bottom-center">
                {toasts.map(toast => (
                    <Toast key={toast} bg="secondary">
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Bonanza!</strong>
                        <small>Notification</small>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toast}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}