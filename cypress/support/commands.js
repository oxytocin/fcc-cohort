import { config, bonanza_token } from "../../src/Constants"

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.session('oauth', ()=> {
    cy.log('Logging in to Google')
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('REACT_APP_GOOGLE_CLIENTID'),
        client_secret: Cypress.env('REACT_APP_GOOGLE_CLIENT_SECRET'),
        refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body
      console.log(body.access_token)
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        // ping back end
        const queryUrl = `${config.REDIRECT_URL}?client_id=${config.CLIENT_ID}` +
            `&redirect_uri=${config.OAUTH_FRONTEND_REDIRECT_URL}&response_type=${config.RESPONSE_TYPE}`
        const urlParams = new URLSearchParams(queryUrl);
        const code = urlParams.get("code");
        const backUrl = config.OAUTH_BACKEND_REDIRECT_URL;

        async function fetchToken() {
        let response;

        try { 
            response = await fetch(backUrl, {
            method: "POST",
            mode: "cors",
            body: code
          })
        } catch (e) {
          console.error("Failed to fetch last token");
          return;
        }
        const data = await response.json();
        localStorage.setItem(bonanza_token, data.token);
      }
      fetchToken();
        // default Oauth process located below, modified last Request above to match out app
        // cy.log(body)
        // const userItem = {
        //   token: id_token,
        //   user: {
        //     googleId: body.sub,
        //     email: body.email,
        //     givenName: body.given_name,
        //     familyName: body.family_name,
        //     imageUrl: body.picture,
        //   },
        // }
        //
        //   // JSON.stringify(userItem) <-- original setItem here
        // window.localStorage.setItem('bonanza-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImV4cCI6MTY1NTc0MzEwMiwiZmlyc3ROYW1lIjoiSm9obiIsImlkIjoyLCJsYXN0TmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiZmxhc2hjYXJkLmJvbmFuemEudGVzdEBnbWFpbC5jb20ifQ.zDhlZw1HS06IQhxrxWeGkQN7RatCKu5JX5xccRtmEGk")
        cy.visit('/create-or-join')
      })
    })
  })
})

  