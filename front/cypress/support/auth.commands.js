import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

Cypress.Commands.add('login', (email, pw) => {
  HomePage.clickUserBtn();
  LoginPage
    .fillEmailInput(email)
    .fillPasswordInput(pw)
    .clickLoginBtn();
})

Cypress.Commands.add('checkPopupDefaultMessage', (message) => {
  cy.get('.Toastify__toast--default').should('contain', message);
})

Cypress.Commands.add('checkPopupSuccessMessage', (message) => {
  cy.get('.Toastify__toast--success').should('contain', message);
})

Cypress.Commands.add('checkPopupWarnMessage', (message) => {
  cy.get('.Toastify__toast--warning').should('contain', message);
})


Cypress.Commands.add('checkPopupFailMessage', (message) => {
  cy.get('.Toastify__toast--error').should('contain', message);
})

Cypress.Commands.add('checkNavigation', (message) => {
  cy.location('pathname').should('eq', message);
})