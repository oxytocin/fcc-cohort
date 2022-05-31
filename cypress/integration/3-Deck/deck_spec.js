/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks Deck modification functionality', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('deck_tests').should('exist');
    })

});