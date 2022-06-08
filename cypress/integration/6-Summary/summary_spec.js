/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Cannot access if not signed in', ()=> {
    it.skip('Throws 404 if not signed in', ()=> {
        cy.intercept('/summary') // need to mock created room id?
        cy.visit('/summary')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Checks Summary Page display', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        //cy.intercept('', {fixture: 'finalScores.json'}).as('scoresStub') // fix intercept method)
        cy.visit('/summary')
    })

    it('Displays header "Score Summary"', ()=> {
        cy.get('[data-cy="summary"]')
        .contains('h1', 'Score Summary')
    })

    it('Displays a summary table', ()=> {
        const contents = ["thead", "tbody"]

        cy.get('[data-cy="table"]').children()
        .each(($child, index) => {
            expect($child, contents[index])
        })
    })

    it('Displays Table Headers correctly', ()=> {
        const headers = ["User", "Score", "Rank"]

        cy.get('[data-cy="table-headers"]').children()
        .each(($child, index) => {
            expect($child, headers[index])
        })
    })

    it.skip('Displays all participants in table body', ()=> {
        cy.get('[data-cy="table-body"]').children()
        .should('have.length', 'how to count users in table')
    })

    // check that usernames are displayed in table body
    //
    
    // check that scores are displayed in desc order
    //

    it('Displays "Return" button', ()=> {
        cy.get('[data-cy="return-btn"]')
        .should('have.text', 'Return').click()

        cy.location('pathname').should('include', '/create-or-join')
    })
});