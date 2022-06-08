/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks Summary Page display', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.intercept('', {fixture: 'finalScores.json'}).as('scoresStub') // fix intercept method)
        cy.visit('/summary')
    })

    it('Displays header "Score Summary"', ()=> {
        cy.get('[data-cy="summary"]')
        .contains('h1', 'Score Summary')
    })

    it('Displays a summary table', ()=> {
        const contents = ["thead", "tbody", "tfoot"]

        cy.get('[data-cy="table"]').children()
        .each(($child, index) => {
            expect($child, contents[index]) // not sure about assertion method here
        })
    })

    it('Displays Table Headers correctly', ()=> {
        const headers = ["User", "Score", "Rank"]

        cy.get('[data-cy="table-headers"]').children()
        .each(($child, index) => {
            expect($child, headers[index]) // not sure about assertion method here
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

    it('Displays "Return to Room" button', ()=> {
        cy.get('[data-cy="return-btn"]')
        .contains('button', 'Return to Room').click()

        cy.location('pathname').should('include', '/create-or-join')
    })
});