/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Navbar not displayed if user is not logged in', ()=> {
    it('Only shows "Connect" button at home page', ()=> {
        cy.visit('/')
        cy.get('[data-cy="connect"]').should('exist').and('have.text', 'Connect')
        cy.get('[data-cy="nav-home"]').should('not.exist')
    })
})

describe('Navbar is visible after login', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.visit('/create-or-join')
    });

    it('The page loads and is testable', ()=> {
        cy.contains('Flashcard Bonanza').should('exist');
    });

    it('Displays app name as a link to homepage', ()=> {
        cy.get('[data-cy="nav-home"]')
        .should('have.text', 'Flashcard Bonanza')
        .and('have.attr', 'href').and('eq', '#home')
    });

    it('Redirects to homepage on click', ()=> {
        cy.get('[data-cy="nav-home"]').click()
        cy.location('pathname').should('eq', '/')
    });


    describe('Navbar collapses correctly', ()=> {

        it('Navbar displays correctly on large device', ()=> {
            cy.get('[data-cy="nav-container"]').children('button')
            .should('not.be.visible')

            cy.get('[data-cy="nav-collapse"]')
            .should('not.be.visible')
        });

        it('Navbar displays on small device', ()=> {
            cy.viewport(320, 480)

            cy.get('[data-cy="nav-container"]').children()
            .should('be.visible')

            cy.get('[data-cy="nav-container"]').children('button')
            .click()
            cy.get('[data-cy="nav-collapse"]')
            .should('be.visible')
        })
    });

    describe('Navbar-toggler dropdown functions correctly', ()=> {
        
        it('Dropdown has clickable toggle',  ()=> {
            cy.get('[data-cy="nav-dropdown"]')
            .find('a').should('be.visible')
        })
        
        it('Dropdown contents start hidden', ()=> {
            cy.get('[data-cy="nav-logout"]')
            .should('not.be.be.visible')            
        })

        it('Dropdown items show after click', ()=> {
            cy.get('[data-cy="nav-dropdown"]')
            .should('not.have.class', '.show')
            
            cy.get('[data-cy="nav-dropdown"]')
            .find('a')
            .click()
            .parent().should('have.class', 'show')
        })

        it('Hides "Log Out" if user is currently NOT signed in', ()=> {
            cy.get('[data-cy="nav-logout"]').should('not.have.text', 'Log Out')
        })
    });

    describe('Displays "Log Out" if user is currently signed in', ()=> {

        it('Dropdown displays "Log Out" option', ()=> {
            cy.get('[data-cy="nav-logout"]')
            .should('have.text', 'Log Out')
        })

        it('Log Out button returns to home page', ()=> {
            cy.get('[data-cy="nav-logout"]')
            .click({force: true})

            cy.location('pathname').should('eq', '/')          
        }) 
    })
});