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

    it('Clicking "Connect" opens a window for Google Oauth', function () {
        // window.open is called on click
        // thus we can create method stub after the cy.visit
        // but before cy.click
        cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen')
        })

        cy.get('[data-cy="connect"]').click()
        cy.get('@windowOpen').should('be.calledWith', "https://accounts.google.com/o/oauth2/v2/auth?client_id=849784468632-n9upp7q0umm82uecp5h3pfdervht7sjg.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/oauth-redirect&response_type=code&scope=openid profile email",
         "WINDOW TITLE", "width=500,height=400,left=518,top=169.6")
    })
    
});