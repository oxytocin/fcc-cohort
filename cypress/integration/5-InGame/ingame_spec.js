/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks In-game functionality', ()=> {

    beforeEach(() => {
        cy.visit('/in-game')
    })

    it('is testable at least', ()=> {
        cy.contains('Question').should('exist');
    })

});