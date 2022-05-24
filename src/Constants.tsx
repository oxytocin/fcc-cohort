const prod = {
    OAUTH_REDIRECT_URL: "https://flashcard-bonanza-frontend.herokuapp.com/oauth-redirect"
}

const dev = {
    OAUTH_REDIRECT_URL: "http://127.0.0.1:3000/oauth-redirect"
}

export const config = process.env.REACT_APP_ENVIRONMENT === "development" ? dev : prod;
