/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks Room functionality', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('Room').should('exist');
    })

});