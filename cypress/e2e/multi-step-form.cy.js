const user = {
  name: 'John Doe',
  email: 'jd@lorem.ipsum',
  phone: '+1234567890',
};

const isStepVisible = (currentStep) => {
  const steps = [
    'Personal info',
    'Select your plan',
    'Pick add-ons',
    'Finishing up',
    'Thank you!',
  ];

  steps.forEach((step) => {
    steps.indexOf(step) === currentStep
      ? cy.contains(step).should('be.visible')
      : cy.contains(step).should('not.be.visible');
  });
};

const checkStepStatus = (step, status) => {
  cy.contains(`Step ${1 + step}`)
    .parent()
    .parent()
    .parent()
    .should('have.class', `ant-steps-item-${status}`);
};

describe('multi-step form', () => {
  it('fills and submits form', () => {
    cy.visit('http://localhost:5173/');

    isStepVisible(0);
    for (let i = 0; i < 4; i++) {
      i === 0 ? checkStepStatus(i, 'active') : checkStepStatus(i, 'wait');
    }
    cy.contains('Backward').should('not.be.visible');
    cy.contains('Forward').should('be.disabled');
    cy.get('#form_item_name')
      .type('1337 User')
      .should('have.value', '1337 User');
    cy.get('#form_item_email')
      .type(user.email)
      .should('have.value', user.email);
    cy.get('#form_item_phone')
      .type(user.phone)
      .should('have.value', user.phone);
    cy.contains('Name is required');
    cy.contains('Forward').should('be.disabled');
    cy.get('#form_item_name ~ span [role="button"]')
      .click()
      .should('have.value', '');
    cy.get('#form_item_name').type(user.name).should('have.value', user.name);
    cy.contains('Forward').click();

    isStepVisible(1);
    checkStepStatus(1, 'active');
    checkStepStatus(0, 'finish');
    cy.get('[for="plan-1"]')
      .as('plan-1')
      .children()
      .should('have.class', 'active');
    cy.get('[for="plan-2"]')
      .as('plan-2')
      .click()
      .children()
      .should('have.class', 'active');
    cy.contains('Forward').click();

    isStepVisible(2);
    checkStepStatus(2, 'active');
    checkStepStatus(1, 'finish');
    cy.get('#addon-1').click().should('be.checked');
    cy.get('#addon-3').click().should('be.checked');
    cy.contains('Forward').click();

    isStepVisible(3);
    checkStepStatus(3, 'active');
    checkStepStatus(2, 'finish');
    cy.contains('Total (per month)');
    cy.contains('Change').click();

    isStepVisible(1);
    for (let i = 0; i < 4; i++) {
      i === 0
        ? checkStepStatus(i, 'finish')
        : i === 1
        ? checkStepStatus(i, 'active')
        : checkStepStatus(i, 'wait');
    }
    cy.get('@plan-2').children().should('have.class', 'active');
    cy.get('[for="plan-3"]')
      .as('plan-3')
      .click()
      .children()
      .should('have.class', 'active');
    cy.get('@plan-1').contains('$9');
    cy.get('@plan-2').contains('$12');
    cy.get('@plan-3').contains('$15');
    cy.get('button[role="switch"]')
      .should('have.attr', 'aria-checked', 'monthly')
      .click()
      .should('have.attr', 'aria-checked', 'yearly');
    cy.get('@plan-1').contains('$90');
    cy.get('@plan-2').contains('$120');
    cy.get('@plan-3').contains('$150');
    cy.contains('2 months free');
    cy.contains('Forward').click();

    isStepVisible(2);
    checkStepStatus(2, 'active');
    checkStepStatus(1, 'finish');
    cy.get('#addon-1').should('be.checked');
    cy.get('#addon-3').should('be.checked');
    cy.get('#addon-2').click().should('be.checked');
    cy.contains('Forward').click();

    isStepVisible(3);
    checkStepStatus(3, 'active');
    checkStepStatus(2, 'finish');
    cy.contains('Pro (Yearly)').siblings().contains('$150');
    cy.contains('Online service').parent().contains('+$10');
    cy.contains('Larger storage').parent().contains('+$20');
    cy.contains('Customizable Profile').parent().contains('+$30');
    cy.contains('Total (per year)').siblings().contains('$210');

    cy.contains('Backward').click().click().click();
    cy.contains('Forward').click().click().click();
    cy.contains('Confirm').click();

    isStepVisible(4);
    checkStepStatus(3, 'finish');
    cy.contains('Backward').should('not.be.visible');
    cy.contains('Forward').should('not.be.visible');
  });
});
