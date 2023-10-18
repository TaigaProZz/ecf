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

  getLoginBtn() {
    return cy.get('[id="login-btn"]');
  }

  fillEmailInput(email) {
    const field = this.getEmailInput();
    field.clear();
    field.type(email);
    return this;
  }

  fillEmailInput(email) {
    const field = this.getEmailInput();
    field.clear();
    field.type(email);
    return this;
  }

  fillPasswordInput(password) {
    const field = this.getPasswordInput();
    field.clear();
    field.type(password);
    return this;
  }

  clickLoginBtn() {
    return this.getLoginBtn().click();
  }
}

export default new LoginPage();