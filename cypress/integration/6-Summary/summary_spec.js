/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks Summary Page display', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('Summary').should('exist');
    })

});