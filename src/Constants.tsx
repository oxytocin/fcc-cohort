const dev_backend_port = ":8080"
const dev_frontend_port = ":3000"
const dev_host_location = "http://127.0.0.1"
const dev_websocket_location = "ws://127.0.0.1"
const prod_frontend_host_location = "https://flashcard-bonanza-frontend.herokuapp.com"
const prod_backend_host_location = "https://flashcard-bonanza-backend.herokuapp.com"
const prod_websocket_location = "ws://flashcard-bonanza-backend.herokuapp.com"
const choose_deck_path = "/set-choice"
const create_room_endpoint = "api/room/create"
const deck_owner_endpoint = "api/deck/owner"
const deck_endpoint = "api/deck"
const login_endpoint = "login"

const redirect_url = "https://accounts.google.com/o/oauth2/v2/auth"
const client_id="849784468632-n9upp7q0umm82uecp5h3pfdervht7sjg.apps.googleusercontent.com"
const response_type="code&scope=openid profile email";

const prod = {
    BACKEND_HOST_LOCATION: prod_backend_host_location,
    BACKEND_WS_LOCATION: prod_websocket_location,
    OAUTH_FRONTEND_REDIRECT_URL: `${prod_frontend_host_location}/oauth-redirect`,
    OAUTH_BACKEND_REDIRECT_URL: `${prod_backend_host_location}/login`,
    CREATE_OR_JOIN: `${prod_frontend_host_location}/create-or-join`,
    REDIRECT_URL: `${redirect_url}`,
    CLIENT_ID:`${client_id}`,
    RESPONSE_TYPE:`${response_type}`,
    CHOOSE_SET_PATH: choose_deck_path,
    CREATE_ROOM_ENDPOINT: create_room_endpoint,
    DECK_OWNER_ENDPOINT: deck_owner_endpoint,
    DECK_ENDPOINT: deck_endpoint,
    LOGIN_ENDPOINT: login_endpoint,
}

const dev = {
    BACKEND_HOST_LOCATION: `${dev_host_location}${dev_backend_port}`,
    BACKEND_WS_LOCATION: `${dev_websocket_location}${dev_backend_port}`,
    OAUTH_FRONTEND_REDIRECT_URL: `${dev_host_location}${dev_frontend_port}/oauth-redirect`,
    OAUTH_BACKEND_REDIRECT_URL: `${dev_host_location}${dev_backend_port}/login`,
    CREATE_OR_JOIN: `${dev_host_location}${dev_frontend_port}/create-or-join`,
    REDIRECT_URL: `${redirect_url}`,
    CLIENT_ID:`${client_id}`,
    RESPONSE_TYPE:`${response_type}`,
    CHOOSE_SET_PATH: choose_deck_path,
    CREATE_ROOM_ENDPOINT: create_room_endpoint,
    DECK_OWNER_ENDPOINT: deck_owner_endpoint,
    DECK_ENDPOINT: deck_endpoint,
    LOGIN_ENDPOINT: login_endpoint,
}

export const config = process.env.NODE_ENV === "production" ? prod : dev;
export const bonanza_token = "bonanza-token"
