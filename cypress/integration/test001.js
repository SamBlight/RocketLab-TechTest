/// <reference types="cypress" />

context('Application test set 001', () => {
    // Create Items and Delete one, check deleted row no longer exists
    it('Todo List check add items', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=Todolist-textField]').type('Buy Book');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy=Todolist-textField]').type('Sell Book');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy="Item Buy Book"]').contains('Buy Book');
        cy.get('[data-cy="Delete Buy Book"]').click();

        cy.get('[data-cy="Item Buy Book"]').should('not.exist');
    })

    // Add Items check counts complete Item confirm Item count matches expected
    it('Todo List Complete tasks and check count', () => {
        cy.get('[data-cy=Todolist-textField]').type('Make Todo List');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy=Todolist-textField]').type('Finish Todo List development');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy=Todolist-counts]').should('have.text', '0 / 3');

        cy.get('[data-cy="Not-Completed Make Todo List"]').click();

        cy.get('[data-cy=Todolist-counts]').should('have.text', '1 / 3');
    })

    // Add Items Prioritize Items sort by name and priority and confirm results are as expected
    it('Todo List Prioritize tasks and sort list', () => {
        cy.get('[data-cy=Todolist-textField]').type('One more Job');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy=Todolist-textField]').type('Learn Guitar');
        cy.get('[data-cy=Todolist-submitButton]').click();

        cy.get('[data-cy="Increase Sell Book"]').click();
        cy.get('[data-cy="Increase Finish Todo List development"]').click();
        cy.get('[data-cy="Decrease Make Todo List"]').click();

        //I'm not impressed with this check. I know there are better ways to do it. I would be keen to learn how, and will keep looking into it.
        cy.get('[data-cy=Todolist-sortName]').click();
        cy.get('[data-cy="The List"]').should('have.text', 'Finish Todo List developmentLearn GuitarMake Todo ListOne more JobSell Book');

        cy.get('[data-cy=Todolist-sortPriority]').click();
        cy.get('[data-cy="The List"]').should('have.text', 'Finish Todo List developmentSell BookLearn GuitarOne more JobMake Todo List');
    })
})

