import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe('No Email', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    HomePage.clickUserBtn();
    LoginPage.fillEmailInput(' ');
    LoginPage.fillPasswordInput('123456');
    LoginPage.clickLoginBtn();
  })
})


describe('No password', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    HomePage.clickUserBtn();
    LoginPage.fillEmailInput('test@mail.com');
    LoginPage.fillPasswordInput(' ');
    LoginPage.clickLoginBtn();
  })
})


describe('Wrong email', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    HomePage.clickUserBtn();
    LoginPage.fillEmailInput('a@gmail.com');
    LoginPage.fillPasswordInput('123456');
    LoginPage.clickLoginBtn();
  })
})

describe('Wrong password', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    HomePage.clickUserBtn();
    LoginPage.fillEmailInput('aa');
    LoginPage.fillPasswordInput('123456');
    LoginPage.clickLoginBtn();
  })
})

describe('good', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    HomePage.clickUserBtn();
    LoginPage.fillEmailInput('aa');
    LoginPage.fillPasswordInput('a');
    LoginPage.clickLoginBtn();
  })
})