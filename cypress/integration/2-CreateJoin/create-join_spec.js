/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Cannot access if not signed in', ()=> {
    it('Throws 404 if not signed in', ()=> {
        cy.intercept('/create-or-join').as('shouldFail')
        cy.visit('/create-or-join')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
    })
})

describe('Create or join room loads', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/create-or-join')
    });

    it('Displays app header and greeting to the user and button elements', ()=> {
        cy.get('[data-cy="header"]').should('exist')
        .and('have.text', "Flashcard Bonanza")

        const userFirstname = localStorage.getItem(googleCypress.user.givenName)
        cy.get('[data-cy="greeting"]')
        .should('contain.text', 'Welcome')
        .and('contain.text', userFirstname)

        cy.get('[data-cy="btn-toolbar"]').children().should('have.length', 2);
    })

    it('Display and verify Host room button', ()=> {
        cy.get('[data-cy="host-btn"]')
        .should('have.text', "Host room")

        cy.get('[data-cy="host-btn"]').click()
        cy.location('pathname').should('contain', '/set-choice')
    });

    it('Display and verify Join room button', ()=> {
        cy.get('[data-cy="join-btn"]')
        .should('have.text', "Join room")

        cy.get('input').invoke('attr', 'placeholder').should('contain', 'username')
        cy.get('input').type('123456789')

        cy.get('[data-cy="join-btn"]').click() // need to intercept here?
        cy.location('pathname').should('contain', '/waiting-room/123456789') // not sure about this route-wise????
    })
});