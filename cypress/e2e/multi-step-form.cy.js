describe('multi-step form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('info', () => {
    cy.contains('Personal info');

    const name = 'John Doe';
    const email = 'john@doe.lorem';
    const phone = '+1234567890';

    cy.get('#form_item_name').type(name);
    cy.get('#form_item_email').type(email);
    cy.get('#form_item_phone').type(phone);
  });
});
