describe('auth tests', () => {
  const email = 'admin@gmail.com';

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('no email', () => {
    cy.login(' ', '123456');
    cy.checkPopupWarnMessage('Veuillez remplir tous les champs');
  })

  it('No password', () => {
    cy.login('test@mail.com', ' ');
    cy.checkPopupWarnMessage('Veuillez remplir tous les champs');
  })

  it('wrong email', () => {
    cy.login('a@gmail.com', '123456');
  })

  it('wrong password', () => { 
    cy.login(email, '123456');
  })

  it('login successfull', () => {
    cy.login(email, 'a');
    cy.checkNavigation('/admin');
    cy.checkPopupSuccessMessage(`${email}, vous êtes connecté`);
  })
})