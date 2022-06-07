/* eslint-disable no-undef */
/// <reference types="cypress" />
import ingameData from '../../fixtures/ingameData.json'

describe('Checks In-game functionality', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        // cy.intercept('/in-game',
        //     {
        //         statusCode: 200,
        //         body: ''
        //     }).as('flashCards')
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
        const userTimer = 0.5 + 10 // to be taken from fixture data

        it('can mark and unmark answer choice boxes', ()=> {
            cy.get('input#A').click({force: true}).should('be.checked')
            cy.wait(250)
            cy.get('input#A').click({force: true}).should('be.not.checked')
        })

        it('timer counts down', ()=> {
            cy.get('[data-cy="timer"]').invoke('text')
                .then((text1) => {
                    const initTimer= parseFloat(text1)

                    cy.wait(1500)

                    cy.get('[data-cy="timer"]').invoke('text')
                        .then(parseFloat).should('be.lt', initTimer)
                })
        })

        it('updates user score on correct answer only', ()=> {
            // figure out how to find correct answers if shuffled
            // cy.get('[data-cy="answers"]').each(($ele) => {
            //     if ($ele.text === /value2correct/) {
            //         return $ele
            //     }
            // }).click({force: true})
            //.contains(/correct/).click({force: true})
            cy.get('input#A, input#B').click({force: true, multiple: true})
            cy.contains('h2', 'A').should('not.have.class', 'bg-success')
            cy.contains('h2', 'B').should('not.have.class', 'bg-success')
            //cy.get('input#B').click({force: true})
            cy.get('[data-cy="score"]').invoke('text').then((score) => {
                expect(score).to.equal('Score: 0')

                cy.wait(userTimer * 1000)
                cy.get('[data-cy="score"]').invoke('text').should('eq', 'Score: 1')
            })

            cy.contains('h2', 'A').should('have.class', 'bg-success')
            cy.contains('h2', 'B').should('have.class', 'bg-success')
        })

        it('increments user score on correct answer', ()=> {
            // figure out how to find false answers if shuffled and mark one

            cy.contains('false').click({force: true})
            cy.get('[data-cy="score"]').invoke('text').then((score) => {
                expect(score).to.equal('Score: 0')

                cy.wait(userTimer * 1000)
                cy.get('[data-cy="score"]').invoke('text').should('eq', 'Score: 0')
            })

            cy.contains('false').should('not.have.class', 'bg-success')
        })

    })

});