/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Navbar is visible', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('The page loads and is testable', ()=> {
        cy.contains('Flashcard Bonanza').should('exist');
    })

});