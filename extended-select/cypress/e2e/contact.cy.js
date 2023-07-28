/// <reference types="Cypress" />

describe('contact form', () => {
    beforeEach(() => {
        cy.visit('/about');
    });

    it('should submit the form', () => {
        cy.get('[data-cy="contact-input-message"]').type('Message text');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn'); 
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.contains('Send Message');
        }); 
        cy.screenshot();
        // cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        // cy.get('[data-cy="contact-btn-submit"]').should('not.be.disabled');
        cy.get('[data-cy="contact-input-email"]').type('test@test.com{enter}');
        // cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('be.disabled');
    });

    it('should validate the form input', () => {
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]')
            .should('not.have.attr', 'disabled')
            .and('not.eq', 'Sending...');

        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');

        cy.get('[data-cy="contact-input-message"]').as('msgInput');
        cy.get('@msgInput').blur();
        cy.get('@msgInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/);

        cy.get('[data-cy="contact-input-name"]').as('nameInput');
        cy.get('@nameInput').focus().blur();
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/);

        cy.get('[data-cy="contact-input-email"]').as('emailInput');
        cy.get('@emailInput').focus().blur();
        cy.get('@emailInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/);
    });
});
