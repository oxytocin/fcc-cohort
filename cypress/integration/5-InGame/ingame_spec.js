/* eslint-disable no-undef */
/// <reference types="cypress" />
import ingameData from '../../fixtures/ingameData.json'

describe('Checks In-game functionality', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.intercept('/in-game',
            {
                statusCode: 200,
                body: ''
            }).as('flashCards')
        cy.visit('/in-game')
    })

    describe('All initial elements load', ()=> {
        it('Displays displays all elements', ()=> {
            cy.get('[data-cy="ques-num"]').should('exist').and('contain.text', 'Question')
            cy.get('[data-cy="timer"]').should('exist').and('contain.text', 'sec...')
            cy.get('[data-cy="progress"]').should('exist')
            cy.get('[data-cy="score"]').should('exist').and('contain.text', 'Score:')
            cy.get('[data-cy="question"]').should('exist').and('not.be.empty')
            cy.get('[data-cy="answers"]').children()
            .should('exist').and('have.length.within', 1, 6)
        })
    })

    describe('In-game mechanics work as expected', ()=> {


    })

});