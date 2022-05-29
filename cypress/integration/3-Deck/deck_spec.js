/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks login is functioning correctly', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('deck_tests').should('exist');
    })

//    it('Brings up google sign-in', ()=> {
//        cy.get('button[value="Connect"]').click();
//    })
});