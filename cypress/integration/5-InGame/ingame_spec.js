/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks In-game functionality', ()=> {

    beforeEach(() => {
        cy.visit('/in-game')
    })

    describe('All initial elements load', ()=> {
        it('Displays question progress', ()=> {
            cy.get('[data-cy="ques-num"]').should('exist').and('contain.text', 'Question')
        })

        it('Displays a countdown timer', ()=> {
            cy.get('[data-cy="timer"]').should('exist').and('contain.text', 'sec...')
        })

        it('Displays a progress bar', ()=> {
            cy.get('[data-cy="progress"]').should('exist')
        })

        it('Displays user score', ()=> {
            cy.get('[data-cy="score"]').should('exist').and('contain.text', 'Score:')
        })

        it('Displays a question', ()=> {
            cy.get('[data-cy="question"]').should('exist').and('not.be.empty')
        })

        it('Displays answer choices', ()=> {
            cy.get('[data-cy="answers"]').children()
            .should('exist').and('have.length.at.most', 4)
        })
    })

    describe('In-game mechanics work as expected', ()=> {


    })

});