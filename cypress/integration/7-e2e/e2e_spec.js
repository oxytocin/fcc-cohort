/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('User completes a session', ()=> {
    it('User logs in', ()=> {
        cy.loginByGoogleApi()
        cy.visit('/').then(() => {
            expect(localStorage.getItem('googleCypress')).to.exist
        })

    })

}) // finish out true e2e test