/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Create or join room loads', ()=> {

    beforeEach(() => {
        cy.visit('/create-or-join')
    });

    it('Displays app header', ()=> {
        cy.get('[data-cy="header"]').should('exist')
        .and('have.text', "Flashcard Bonanza")
    });

    it('Displays a greeting to the user', ()=> {
        cy.get('[data-cy="greeting"]')
        .should('contain.text', 'Welcome')
        .and('contain.text', 'this username')
    })

    it('Displays two buttons', ()=> {
        cy.get('[data-cy="btn-toolbar"]').children().should('have.length', 2);
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

    it('Verify Host Button link', ()=> {
        cy.get('[data-cy="host-btn"]').click()
        cy.location('pathname').should('eq', 'fix this link')
    })

    it('Verify Join Button link', ()=> {
        cy.get('[data-cy="join-btn"]').click()
        cy.location('pathname').should('eq', 'fix this link')
    })
});