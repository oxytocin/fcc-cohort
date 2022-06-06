/* eslint-disable no-undef */
/// <reference types="cypress" />

// this needs a lot of attention

describe('Cannot access if not signed in', ()=> {
    it('Throws 404 if not signed in', ()=> {
        cy.intercept('/some-room-id').as('shouldFail')
        cy.visit('/some-room-id')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Checks Room functionality', ()=> {

    beforeEach(() => {
        cy.visit('/')
    })

    it('is testable at least', ()=> {
        cy.contains('Room').should('exist');
    })

});