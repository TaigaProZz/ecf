describe('auth tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('no email', () => {
    cy.login(' ', '123456');
    cy.checkPopupMessage('Veuillez remplir tous les champs');
  })

  it('No password', () => {
    cy.login('test@mail.com', ' ');
    cy.checkPopupMessage('Veuillez remplir tous les champs');
  })

  it('wrong email', () => {
    cy.login('a@gmail.com', '123456');
  })

  it('wrong password', () => { 
    cy.login('aa', '123456');
  })

  it('login successfull', () => {
    cy.login('aa', 'a');
    cy.checkNavigation('/admin');
    cy.checkPopupSuccessMessage('aa, vous êtes connecté');
  })
})