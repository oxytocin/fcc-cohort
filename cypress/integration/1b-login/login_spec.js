/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks login is functioning correctly', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('App loads to the homepage', ()=> {
        cy.contains('Flashcard Bonanza').should('exist');

        cy.contains('Connect').should('exist');

        cy.location('pathname').should('eq', '/')
    })

    it('Connect button is displayed', ()=> {
        cy.get('[data-cy="connect"]').should('have.text', 'Connect')
    })

    it('Google Login is working', ()=> {

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
    
            window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
            expect(userItem).to.have.property('token')
            expect(userItem).to.have.property('user')
            cy.visit('/')
        })
        })

    })
    
});


// Cannot test connect button due to cross-origin problem. Config=> chomeWebSecurity is read-only at test-time
// Doing this would require chomeWebSecurity to be disabled for the entirety of the test suite-- not worth it

// describe('Test "Connect" button (Chrome Only)', {chromeWebSecurity: false}, ()=> {
//     if (Cypress.isBrowser('chrome')) {
//         it('Clicking "Connect" proceeds with Google Oauth', ()=> {
//             cy.intercept()
//             cy.get('[data-cy="connect"]').click()
//             cy.on('url:changed', (redirect)=> {
//                 expect(redirect).to.contain('/oauth-redirect')
//             })
//         })
//     }
// })