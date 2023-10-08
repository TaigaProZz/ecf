class HomePage {
  constructor() {
    this.url = 'http://localhost:3000/';
  }

  getUserBtn() {
    return cy.get('[data-qa="user-btn"]');
  }

  clickUserBtn() {
    return this.getUserBtn().click();
  }
}

export default new HomePage();