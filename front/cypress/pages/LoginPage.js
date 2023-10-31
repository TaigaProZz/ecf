class LoginPage {
  constructor() {
    this.url = 'http://localhost:3000/login';
  }

  getEmailInput() {
    return cy.get('[id="email"]');
  }

  getPasswordInput() {
    return cy.get('[id="password"]');
  }

  getLoginBtn() {
    return cy.get('[id="login-button"]');
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