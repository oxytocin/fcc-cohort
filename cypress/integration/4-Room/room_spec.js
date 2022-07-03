/* eslint-disable no-undef */
/// <reference types="cypress" />

// this needs a lot of attention

describe('Cannot access if not signed in', ()=> {
    it.skip('Throws 404 if not signed in', ()=> {
        cy.intercept('/waiting-room') // need to mock created room id?
        cy.visit('/waiting-room')

        cy.wait('@shouldFail').its('response.statusCode').should('eq', 404)
        expect('this test').to.be('failing') // fix pathname
    })
})

describe('Check Waiting Room functionality', ()=> {

    beforeEach(() => {
        cy.loginByGoogleApi()
        cy.waitingRoomSetup()
    })

    it('Displays all elements', ()=> {
        cy.contains('Room Code').should('be.visible');
        cy.get('#inlineFormInput').should('be.visible').and('have.attr', 'readonly')
        cy.get('.input-group-text').find('input').should('be.visible').and('have.attr', 'type', 'image')
        cy.get('#inlineFormInput2').should('be.visible').invoke('attr', 'placeholder').then((text)=> {
            expect(text).to.equal('Time in seconds')
        })
        cy.contains('Start Game').should('be.visible').and('have.attr', 'type', 'button')
        cy.contains('Users Joined').should('be.visible')
    })

    it('Copies Room Code to clipboard **Check**', ()=> {
        // allow chrome to access the clipboard
        cy.wrap(Cypress.automation('remote:debugger:protocol', {
            command: 'Browser.grantPermissions',
            params: {
                permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
                origin: window.location.origin,
            },
        }))
        cy.window().its('navigator.permissions')
            .invoke('query', { name: 'clipboard-read' })
            .its('state').then(cy.log)

        // Click copy and compare
        cy.get('#inlineFormInput').invoke('attr', 'placeholder').then(roomCodeText =>
            cy.get('.input-group-text').find('input').focus().realClick().then(()=>{
                cy.window().its('navigator.clipboard').invoke('readText').should('equal', roomCodeText)        
            })
        )

        cy.get('#button-tooltip').should('be.visible').and('have.text', "Copied!")
    })

    it.skip('Updates "Users Joined" list on join', ()=> {
        // NEED TO INSTALL WEBSOCKET SUPPORT PACKAGE
    })

    it('Displays Toast Error on non-number or empty "Seconds" input', ()=> {
        cy.contains('Start Game').realClick()
        cy.get('.toast').should('be.visible').and('contain.text', 'Time per question must be a number.')
        cy.get('[data-dismiss="toast"]').realClick()
        cy.get('toast').should('not.exist')

        cy.get('#inlineFormInput2').type('test')
        cy.contains('Start Game').realClick()
        cy.get('.toast').should('be.visible').and('contain.text', 'Time per question must be a number.')
    })
});