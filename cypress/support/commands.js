import {config} from "../../src/Constants"

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
        cy.log(body)
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
          // must figure out a way to ping the backend login to generate bonanza-specific token
          // JSON.stringify(userItem) <-- original setItem here
        window.localStorage.setItem('bonanza-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImV4cCI6MTY1NTA4NDQyMiwiZmlyc3ROYW1lIjoiSm9obiIsImlkIjoyLCJsYXN0TmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiZmxhc2hjYXJkLmJvbmFuemEudGVzdEBnbWFpbC5jb20ifQ.TKslas_OL-9pqJp6MmIcJ-Bg-C8RHTwpPim2P0U_G0w")
        cy.visit('/create-or-join')
      })
    })
  })
})

  