import { config, bonanza_token } from "../../src/Constants"
import deckData from './../fixtures/deckData.json'

Cypress.Commands.add('loginByGoogleApi', () => {
  //cy.session('oauth', ()=> {
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
      //console.log(body.access_token)
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

        cy.request({
          method: 'POST',
          url: backUrl,
          mode: 'cors',
          body: code
        }).then(({ body }) => {
          //console.log(body.token)
          localStorage.setItem(bonanza_token, body.token);
        })

        cy.visit('/create-or-join')
      })
    })
 // })
})

function waitingRoomSetup() {
  cy.log('Setting up in-game data')
  // intercept fetchUserDecks, stub
  cy.intercept('api/deck/owner', {body: deckData}).as('deckStub')
  cy.visit('/set-choice')
  // Select the first deck 'Start Game' button
  cy.contains('Start Game').click({force: true})
  // NEED TO SETUP WEBSOCKET MOCKS FROM HERE ON.....  
}

Cypress.Commands.add('waitingRoomSetup', ()=> {
  waitingRoomSetup()
})

// Cypress.Commands.add('ingameSetup', ()=> {
//   cy.log('Setting up in-game data')
//   // intercept fetchUserDecks, stub
//   cy.intercept('api/deck/owner', {body: deckData}).as('deckStub')
//   cy.visit('/set-choice')
//   // Select the first deck 'Start Game' button
//   cy.contains('Start Game').click({force: true})

// })

  