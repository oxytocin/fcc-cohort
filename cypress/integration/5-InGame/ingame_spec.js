/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks In-game functionality', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('Progress').should('exist');
    })

});