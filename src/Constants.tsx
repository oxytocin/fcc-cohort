const dev_backend_port = ":9000"
const dev_frontend_port = ":3000"
const dev_host_location = "http://127.0.0.1"
const prod_frontend_host_location = "https://flashcard-bonanza-frontend.herokuapp.com"
const prod_backend_host_location = "https://flashcard-bonanza-backend.herokuapp.com"

const redirect_url = "https://accounts.google.com/o/oauth2/v2/auth"
const client_id="849784468632-n9upp7q0umm82uecp5h3pfdervht7sjg.apps.googleusercontent.com"
const response_type="code&scope=openid profile email";

const prod = {
    BACKEND_HOST_LOCATION: prod_backend_host_location,
    OAUTH_FRONTEND_REDIRECT_URL: `${prod_frontend_host_location}/oauth-redirect`,
    OAUTH_BACKEND_REDIRECT_URL: `${prod_backend_host_location}/login`,
    CREATE_OR_JOIN: `${prod_frontend_host_location}/create-or-join`,
    REDIRECT_URL: `${redirect_url}`,
    CLIENT_ID:`${client_id}`,
    RESPONSE_TYPE:`${response_type}`,
}

const dev = {
    BACKEND_HOST_LOCATION: `${dev_host_location}${dev_backend_port}`,
    OAUTH_FRONTEND_REDIRECT_URL: `${dev_host_location}${dev_frontend_port}/oauth-redirect`,
    OAUTH_BACKEND_REDIRECT_URL: `${dev_host_location}${dev_backend_port}/login`,
    CREATE_OR_JOIN: `${dev_host_location}${dev_frontend_port}/create-or-join`,
    REDIRECT_URL: `${redirect_url}`,
    CLIENT_ID:`${client_id}`,
    RESPONSE_TYPE:`${response_type}`,
}

export const config = process.env.NODE_ENV === "production" ? prod : dev;
export const bonanza_token = "bonanza-token"
