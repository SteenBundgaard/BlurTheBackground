describe('App E2E', () => {
    it('should have a header', () => {
      cy.visit('https://localhost:3000');
   
      cy.get('h1')
        .should('have.text', 'Blur the Background');
    });
  });