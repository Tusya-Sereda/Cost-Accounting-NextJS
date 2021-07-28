// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getElement", (elementId, children) => {
  if (children) {
    cy.get(`[data-testid=${elementId}] ${children}`);
    return;
  }

  cy.get(`[data-testid=${elementId}]`);
});

// Cypress.Commands.add("form", (inputWhere, inputHowMuch) => {
//   cy.getElement("inputWhere", "> div").type(inputWhere);
//   cy.getElement("inputHowMuch", "> div").type(inputHowMuch);
//   cy.getElement("buttonAdd").click();
// });

Cypress.Commands.add(
  "form",
  (idWhere, idHowMuch, idButton, inputWhere, inputHowMuch) => {
    if (inputWhere.length && inputHowMuch !== 0) {
      cy.getElement(`${idWhere}`, "> div").type(inputWhere);
      cy.getElement(`${idHowMuch}`, "> div").type(inputHowMuch);
      if (idButton.length) {
        cy.getElement(idButton).click();
      }
    } else {
      
    }
  }
);
