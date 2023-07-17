describe('multi-step form', () => {
  it('info', () => {
    const name = 'John Doe';
    const email = 'jd@lorem.ipsum';
    const phone = '+1234567890';

    cy.visit('http://localhost:5173/');
    cy.contains('Personal info');
    // cy.get('[data-cy="step-1"]').should('not.be.visible')
    cy.get('#form_item_name').type(name).should('have.value', name);
    cy.get('#form_item_email').type(email).should('have.value', email);
    cy.get('#form_item_phone').type(phone).should('have.value', phone);
    cy.contains('Forward').click();
    cy.contains('Select your plan');
    cy.get('[for="plan-2"]').click();
    cy.contains('Forward').click();
    cy.contains('Pick add-ons');
    cy.get('#addon-1').click();
    cy.get('#addon-3').click();
    cy.contains('Forward').click();
    cy.contains('Finishing up');
    cy.contains('Change').click();
    cy.contains('Select your plan');
    cy.get('[for="plan-3"]').click();
    cy.get('button[role="switch"]').click();
    cy.contains('Forward').click();
    cy.get('#addon-2').click();
    cy.contains('Forward').click();
    for (let i = 0; i < 3; i++) {
      cy.contains('Backward').click();
    }
    for (let i = 0; i < 3; i++) {
      cy.contains('Forward').click();
    }
    cy.contains('Confirm').click();
    cy.contains('Thank you!');
  });
});
