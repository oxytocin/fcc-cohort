/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Navbar is visible', ()=> {

    beforeEach(() => {
        cy.visit('/')
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
});

describe('Navbar-toggler dropdown functions correctly', ()=> {

    beforeEach(() => {
        cy.visit('/')
    });
    
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

    it('Dropdown displays "Log Out" option', ()=> {
        cy.get('[data-cy="nav-logout"]')
        .should('have.text', 'Log Out')
    })

    it('Log Out button returns to home page', ()=> {
        cy.get('[data-cy="nav-logout"]')
        .click({force: true})

        cy.location('pathname').should('eq', '/')          
    })
});
