/// <reference types="Cypress" />

describe('tasks managments', () => {
    it('should open and close the new task model', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create a new task', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New task');
        cy.get('#summary').type('Some description');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New task');
        cy.get('.task p').contains('Some description');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values for task title, summary and category!');
    });

    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New task');
        cy.get('#summary').type('Some description');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    });
});
