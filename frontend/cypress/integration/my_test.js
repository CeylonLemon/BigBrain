// 1. Registers successfully
context('Signup flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignUp');
  });

  it('Successfully signs up', () => {
    const name = 'Nicky';
    const email = 'Peter@example.com';
    const password = 'ch6898929'

    cy.get('input[name=firstName]')
      .focus()
      .type(name);
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button[type=submit]')
      .click();
    cy.get('h2[id=greeting]')
  })
})

// 2. Creates a new game successfully
context('Create a Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignIn');
  });

  it('Successfully create a game', () => {
    const email = '1';
    const password = '1'

    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button[type=submit]')
      .click();
    cy.get('button[type=addGame]')
      .click();
    cy.get('input[name=setLimit]')
      .focus()
      .type('{backspace}')
      .type(0)
    cy.on('window:alert', (str) => {
      expect(str).to.equal('success!')
    })
    cy.get('button[type=confirmEdit]')
      .click();
    cy.get('h2[id=greeting]')
  })
})

// 4. Starts a game successfully
// 5. Ends a game successfully (yes, no one will have played it)
context('Start then stop Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignIn?email=1&password=1')
    cy.wait(1000);
  });

  it('Successfully create a game', () => {
    cy.get('a[type=playGame]').eq(0)
      .click();
    cy.get('button[type=stopGame]')
      .click();
    cy.get('h2[id=greeting]')
  })
})

// 6. Loads the results page successfully
context('Start then stop Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignIn?email=1&password=1')
    cy.wait(1000);
  });

  it('Successfully create a game', () => {
    cy.get('a[type=playGame]').eq(0)
      .click();
    cy.get('button[type=startGame]')
      .click();
    cy.get('button[type=advanceGame]')
      .click();
    cy.get('h2[id=greeting]')
  })
})

context('Delete Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignIn?email=1&password=1')
    cy.wait(1000);
  });

  it('Successfully create a game', () => {
    cy.get('button[type=deleteButton]')
  })
})
