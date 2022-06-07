/* eslint-disable no-undef */
/// <reference types="cypress" />
import deckChoice from '../../fixtures/deckChoice.json'

describe('Cannot access if not signed in', ()=> {

    it('Throws 404 if not signed in (Choose a Deck - as host)', ()=> {
        cy.intercept('/choose-a-deck-set').as('shouldFail')
        cy.visit('/choose-a-deck-set')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Choose Deck Page', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi()

        cy.intercept('api/for-deck-call', {fixture: 'deckChoice.json'}).as('deckStub') // fix intercept method

        cy.visit('/choose-a-deck-set').wait('@deckStub')
    })

    it.only('is testable at least', ()=> {
        cy.contains('Choose a Deck...').should('exist');
    })

    describe('Page elements are displayed', ()=> {

        it('Displays Create New Deck button', ()=> {
            cy.contains('Create New Deck').should(($btn)=> {
                expect($btn).to.have.text('Create New Deck')
                expect($btn).to.have.attr('button')
                expect($btn).to.have.attr('href').equal.to('/some-edit-deck-page')
            })
        })

        it('Displays a list of previously created decks', ()=> {
            // mock some data?
            cy.get('[data-cy="all-decks"]').should('have.length.gt', 0)
        })

        it('Verify attributes of each Deck', ()=> {
            cy.get('[data-cy="all-decks"]').children()
            .should('have.attr', "title", "content")
        })
    })

    describe('Interact with deck page elements as host', ()=> {
        // beforeEach to mock some data in this block


        it('Verify Create New Deck button path', ()=> {
            cy.contains('Create New Deck').click()
            cy.location('pathname').should('include', '/some-edit-deck-page')
        })

        it('Hovering over a deck gives options: Create Room, Edit Deck, Delete Deck', ()=> {
            // must have some data in here
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Create Room').should('be.visible')
            cy.contains('Edit Deck').should('be.visible')
            cy.contains('Delete Deck').should('be.visible')
        })

        it('Verify Deck Edit option', ()=> {
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Edit Deck').click({force: true})
            cy.location('pathname').should('include', '/some-edit-deck-page-with-this-deck-id')
        })

        it('Verify Deck Delete option', ()=> {
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Delete Deck').click({force: true})
            cy.get('[data-cy="all-decks"]').select(1).should('not.exist') // need a better way to check the specific deletion -- update later
        })

        it('Verify Create Room option', ()=> {
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Create Room').click({force: true})
            cy.location('pathname').should('include', '/some-room-pathname')
        })
    })
});