/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks Summary Page display', ()=> {

    beforeEach(() => {
        cy.visit('/summary')
    })

    it('is testable at least', ()=> {
        cy.contains('Summary').should('exist');
    })

    it('Displays header "Score Summary"', ()=> {
        cy.get('[data-cy="summary"]')
        .contains('h1', 'Score Summary')
    })

    it('Displays a summary table', ()=> {
        const contents = ["thead", "tbody", "tfoot"]

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

    it('Displays all non-host participants in table body', ()=> {
        cy.get('[data-cy="table-body"]').children()
        .should('have.length', 'how to collect users???')
    })  // mock this out?

    // check that usernames are displayed in table body
    //
    
    // check that scores are displayed in desc order
    //

    it('Displays host in table footer', ()=> {
        cy.get('[data-cy="host"]').contains('the host name')
    })  // mock this out?

    it('Displays host score', ()=> {
        cy.get('[data-cy="host-score"').should('eq', 'the host score')
        // mock this out?
    })

    it('Displays "Return to Room" button', ()=> {
        cy.get('[data-cy="return-btn"]')
        .contains('button', 'Return to Room')
    })
});