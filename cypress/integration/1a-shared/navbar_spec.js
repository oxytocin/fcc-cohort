/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Navbar is visible', ()=> {

    beforeEach(() => {
        cy.visit('/')
    });

    it('The page loads and is testable', ()=> {
        cy.contains('Flashcard Bonanza').should('exist');
    });

    it('Displays app name as a link to homepage', ()=> {
        cy.get('[data-cy="nav-home"]')
        .should('have.text', 'Flashcard Bonanza')
        .and('have.attr', 'href').and('eq', '#home')
    });

    it('Redirects to homepage on click', ()=> {
        cy.get('[data-cy="nav-home"]').click()
        cy.location('pathname').should('eq', '/')
    });

    it('is not finished yet',  ()=> {
        cy.get('[data-cy="nav-collapse"]').should('eq', 'finish tests, andrew')
    })
});