/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Checks login is functioning correctly', ()=> {
    // let oauth;
    
    // before(() => {
    //     cy.fixture('fixture1').then((data)=> {
    //         oauth = data.oauth_dev_url
    //     })
    // })

    beforeEach(() => {
        cy.visit('/')
    })

    it('App loads to the homepage', ()=> {
        cy.contains('Flashcard Bonanza').should('exist');

        cy.contains('Connect').should('exist');

        cy.location('pathname').should('eq', '/')
    })

    it('Connect button is displayed', ()=> {
        cy.get('[data-cy="connect"]').should('have.text', 'Connect')
    })

    it('Clicking "Connect" proceeds with Google Oauth', ()=> {

        cy.get('[data-cy="connect"]').click()

        // this needs to be programmed out... need help figuring out where to store the ENV stuff (will CI have access to it?)
    })
    
});