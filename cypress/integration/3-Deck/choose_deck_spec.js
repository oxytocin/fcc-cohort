/* eslint-disable no-undef */
/// <reference types="cypress" />
import deckData from '../../fixtures/deckData.json'
import { config } from '../../../src/Constants'

describe('Cannot access if not signed in', ()=> {

    it.skip('Throws 404 if not signed in (Choose a Deck - as host)', ()=> {
        cy.intercept('/set-choice').as('shouldFail')
        cy.visit('/set-choice')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Choose Deck Page', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi({log: false})
        cy.intercept('api/deck/owner', {body: deckData}).as('deckStub')

        cy.visit('/set-choice')
        //${config.BACKEND_HOST_LOCATION}/api/deck/owner

    })

    describe('Page elements are displayed', ()=> {

        it('Displays "Create New Deck" button and preview of Decks', ()=> {
            //cy.contains('Choose a Deck...').should('be.visible')

            cy.get('[data-cy="all-decks"]').children().should('have.length.gt', 0)

            cy.get('[data-cy="card-title"]').invoke('text')
            .should('not.be.empty')

            cy.get('[data-cy="card-content"]').invoke('text')
            .should('not.be.empty')
        })
    })

    describe('Interact with deck page elements as host', ()=> {
        // beforeEach to mock some data in this block


        it.skip('Verify Create New Deck button path', ()=> {
            cy.contains('Create New Deck').click()
            cy.location('pathname').should('include', '/edit-deck') // fix this with edit-deck path
        })

        it('Hovering over a deck gives options: Create Room, Edit Deck, Delete Deck', ()=> {
            cy.get('[data-cy="all-decks"]').children().eq(0).trigger('mouseover')
            cy.contains('Start Game').should('be.visible')
            cy.contains('Edit Deck').should('be.visible')
            cy.contains('Delete Deck').should('be.visible')
        })

        it('Verify Deck Edit option', ()=> {
            cy.get('[data-cy="all-decks"]').children().eq(0).trigger('mouseover')
            cy.contains('Edit Deck').click({force: true})
            cy.location('pathname').should('include', '/edit-deck') // fix this with edit-deck path
        })

        it('Verify Deck Delete option', ()=> {
            cy.get('[data-cy="all-decks"]').children().eq(0).should('include.text', 'Test Deck 1')
            cy.get('[data-cy="all-decks"]').children().eq(0).trigger('mouseover')
            cy.contains('Delete Deck').click({force: true})
            cy.get('[data-cy="all-decks"]').children().eq(0).should('not.include.text', 'Test Deck 1')
        })

        it('Verify Create Room option', ()=> {
            cy.get('[data-cy="all-decks"]').children().eq(0).trigger('mouseover')
            cy.contains('Start Game').click({force: true})
            cy.location('pathname').should('include', '/waiting-room')
        })
    })
});