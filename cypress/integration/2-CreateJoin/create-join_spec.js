/* eslint-disable no-undef */
/// <reference types="cypress" />
import jwtDecode from "jwt-decode"
import {bonanza_token} from "../../../src/Constants"

describe('Cannot access if not signed in', ()=> {
    it('Throws 404 if not signed in', ()=> {
        cy.intercept('/create-or-join').as('shouldFail')
        cy.visit('/create-or-join')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
    })
})

describe('Create or Join room', ()=> {
    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/create-or-join')
    });

    it('Displays app header and greeting to the user and button elements', ()=> {
        cy.get('[data-cy="header"]').should('exist')
        .and('have.text', "Flashcard Bonanza")

        let token = localStorage.getItem(bonanza_token) ?? ""
        const decoded = jwtDecode(token)
        let user = decoded.firstName
        //const userFirstname = localStorage.getItem(googleCypress.user.givenName)
        cy.get('[data-cy="greeting"]')
        .should('contain.text', 'Welcome')
        .and('contain.text', user)

        cy.get('[data-cy="host-btn"]').should('have.text', "Host room")

        cy.get('[data-cy="join-btn"]').should('have.text', "Join room")
    })

    it('Display and verify Host room button', ()=> {
        cy.get('[data-cy="host-btn"]').click()
        cy.location('pathname').should('contain', '/set-choice')
    });

    it('Display and verify Join room button', ()=> {
        cy.get('input').invoke('attr', 'placeholder').should('contain', 'Room ID')
        cy.get('input').type('123456789')

        cy.get('[data-cy="join-btn"]').click() // need to intercept here?
        cy.location('pathname').should('contain', '/waiting-room') //
    })
});