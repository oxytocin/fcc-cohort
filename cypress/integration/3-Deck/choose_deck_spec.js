/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Cannot access if not signed in', ()=> {

    it('Throws 404 if not signed in (Choose a Deck - as host)', ()=> {
        cy.intercept('/choose-a-deck-set').as('shouldFail')
        cy.visit('/choose-a-deck-set')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Choose Deck (host choice)', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/new-or-existing-set') // fix pathname
    })

    it('is testable at least', ()=> {
        cy.contains('Choose a Deck...').should('exist');
    })

    describe('Page elements are displayed', ()=> {

        it('Displays two button choices for deck selection', ()=> {
            cy.get('button').should('have.length', 2)

            cy.contains('Select and continue').should(($btn)=> {
                expect($btn).to.have.text('Select and continue')
                expect($btn).to.have.attr('button')
                expect($btn).to.have.attr('href').equal.to('/some-new-room-path')
            })

            cy.contains('Create New Deck').should(($btn)=> {
                expect($btn).to.have.text('Existing Deck')
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

        it('Verify Select and Continue button path', ()=> {
            cy.contains('Select and continue').click()
            cy.location('pathname').should('include', '/some-room-path')
        })

        it('Verify Create New Deck button path', ()=> {
            cy.contains('Create New Deck').click()
            cy.location('pathname').should('include', '/some-edit-deck-page')
        })

        it('Hovering over a deck gives Delete option', ()=> {
            // must have some data in here
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Delete').should('be.visible')

            cy.contains('Delete').click({force: true})

            cy.get('[data-cy="all-decks"]').select(1).should('not.exist')
        })

        it('Hovering over a deck gives Edit option', ()=> {
            cy.get('[data-cy="all-decks"]').select(1).trigger('mouseover')
            cy.contains('Edit this deck').should('be.visible')

            cy.contains('Edit this deck').click({force: true})

            cy.location('pathname').should('include', '/some-edit-deck-page-with-this-deck-id')
        })
    })
});