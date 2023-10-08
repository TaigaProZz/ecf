class LoginPage {
  constructor() {
    this.url = 'http://localhost:3000/login';
  }

  getEmailInput() {
    return cy.get('[id="login-email-input"]');
  }

  getPasswordInput() {
    return cy.get('[id="login-password-input"]');
  }

  fillEmailInput(email) {
    const field = this.getEmailInput();
    field.clear();
    field.type(email);
  }

  fillEmailInput(email) {
    const field = this.getEmailInput();
    field.clear();
    field.type(email);
  }

  fillPasswordInput(password) {
    const field = this.getPasswordInput();
    field.clear();
    field.type(password);
  }

  getLoginBtn() {
    return cy.get('[id="login-btn"]');
  }

  clickLoginBtn() {
    return this.getLoginBtn().click();
  }
}

export default new LoginPage();