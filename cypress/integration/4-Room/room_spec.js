/* eslint-disable no-undef */
/// <reference types="cypress" />

// this needs a lot of attention

describe('Cannot access if not signed in', ()=> {
    it.skip('Throws 404 if not signed in', ()=> {
        cy.intercept('/waiting-room') // need to mock created room id?
        cy.visit('/waiting-room')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Check Waiting Room functionality', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/waiting-room')
    })

    it('Displays all elements', ()=> {
        cy.contains('Room Code').should('be.visible');
        cy.get('#inlineFormInput').should('be.visible').and('have.attr', 'readonly')
        cy.get('.input-group-text').find('input').should('be.visible').and('have.attr', 'type', 'image')

        cy.get('.input-group-text').find('input').focus().realClick()
        cy.get('#button-tooltip').should('be.visible').and('have.text', "Copied!")

        cy.contains('Users Joined').should('be.visible')
    })

});