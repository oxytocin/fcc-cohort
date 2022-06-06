/* eslint-disable no-undef */
/// <reference types="cypress" />

// this needs a lot of attention

describe('Cannot access if not signed in', ()=> {

    it('Throws 404 if not signed in (Add/edit)', ()=> {
        cy.intercept('/some-edit-deck').as('shouldFail')
        cy.visit('/some-edit-deck')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Edit Deck (Add/edit questions)', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/some-edit-deck-path') // fix pathname
    })

    it('is testable at least', ()=> {
        cy.contains('Edit_deck_tests_go_here').should('exist');
    })

    describe('Page elements are displayed', ()=> {
        it('', ()=> {
 
        })
    })

    describe('Interact with page elements', ()=> {
        it('', ()=> {
            
        })
    })

});