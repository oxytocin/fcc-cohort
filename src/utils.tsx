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

export function showToast(toastText: string, toastContext: any) {
    toastContext.setToastText(toastText);
    toastContext.setToastShow(true);
}
