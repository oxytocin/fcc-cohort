import { useContext } from 'react';
import ToastContext from './ToastAlert';

export default function useToastContext() {
    return useContext(ToastContext);
}

/* example usage
1- import { useToastContext } from "./ToastContextHook"
2- your function() {
        const addToast = useToastContext();

        function onEvent() {
            addToast("This thing happened");
        }
    }
*/