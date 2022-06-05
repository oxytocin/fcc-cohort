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

    it('Displays app header', ()=> {
        cy.get('[data-cy="header"]').should('exist')
        .and('have.text', "Flashcard Bonanza")
    });

    it('Displays a greeting to the user', ()=> {
        const userFirstname = localStorage.getItem(googleCypress.user.givenName)
        cy.get('[data-cy="greeting"]')
        .should('contain.text', 'Welcome')
        .and('contain.text', userFirstname)
    })

    it('Displays three buttons', ()=> {
        cy.get('[data-cy="btn-toolbar"]').children().should('have.length', 3);
    });

    it('Display and verify Host room button', ()=> {
        cy.get('[data-cy="host-btn"]')
        .should('have.text', "Host room")
        .and('have.attr', 'href')
    });

    it('Displays Join room button', ()=> {
        cy.get('[data-cy="join-btn"]')
        .should('have.text', "Join room")
        .and('have.attr', 'href')
    });

    it('Displays Edit Decks button', ()=> {
        cy.contains('Edit Decks').should('exist')
    })

    it('Verify Host Button link', ()=> {
        cy.get('[data-cy="host-btn"]').click()
        cy.location('pathname').should('contain', 'whatever the /room path will be')
    })

    it('Verify Join Button link', ()=> {
        cy.get('[data-cy="join-btn"]').click()
        //this should prompt an input for a room number
        cy.location('pathname').should('eq', 'must prompt for room number')
    })

    it('Verify Edit Decks Button link', ()=> {
        cy.contains('Edit Deck').click()
        cy.location('pathname').should('contain', '/add-edit-question')
    })
});