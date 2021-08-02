// 1. Registers successfully
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString (length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const AUTH = {
  name: generateString(5),
  email: generateString(10),
  password: generateString(10)
}
context('Signup flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/SignUp');
  });

  it('Successfully signs up', () => {
    // const name = Math.random();
    // const email = Math.random();
    // const password = Math.random();

    cy.get('input[name=firstName]')
      .focus()
      .type(AUTH.name);
    cy.get('input[name=email]')
      .focus()
      .type(AUTH.email);
    cy.get('input[name=password]')
      .focus()
      .type(AUTH.password);
    cy.get('button[type=submit]')
      .click();
    cy.get('h2[id=greeting]')
  })
})

/**
 *  2. Sign in
 * **/
context('Sign in - happy path', () => {
  beforeEach(() => {
    cy.get('button[name=logoutButton]')
      .click()
  });

  it('Successfully signs in', () => {
    cy.get('input[name=email]')
      .focus()
      .type(AUTH.email);
    cy.get('input[name=password]')
      .focus()
      .type(AUTH.password);
    cy.get('button[name=login]')
      .click();
  })
})
/** 3.Create game **/
context('Create and Edit Game - happy path', () => {
  beforeEach(() => {
    cy.wait(500)
  })
  it('Successfully create a quiz', () => {
    // cy.wait(1500)
    cy.get('button[name=addQuizButton]')
      .click();
    cy.get('svg[name=editQuiz]')
      .click();
    cy.get('input[id=GameTitle]').clear()
      .focus()
      .type('title test');
    cy.get('svg[name=addQuestion]')
      .click();
    cy.get('button[aria-label="Go to page 2"]')
      .click()
    cy.get('input[id=1title]')
      .clear()
      .focus()
      .type('new question title')
    cy.get('span[class=MuiFab-label]')
      .click();
  })
  afterEach(() => {
    cy.get('button[aria-label=close]')
      .click()
  })
})
/** 4.Play a game **/
context('Play a Game - happy path', () => {
  beforeEach(() => {
    cy.wait(500)
  })
  it('Successfully create a quiz', () => {
    cy.get('svg[name=playQuiz]')
      .click()
    cy.get('span[id=pin]')
      .then(element => { cy.request('POST', `http://localhost:5005/play/join/${element.text()}`, { name: 'player' }) })
    // cy.request('POST', `/play/join/${pin}`, { name: 'player' })
    // cy.request('POST', `/play/join/${pin}`, { name: 'player' })
  })
  afterEach(() => { cy.wait(500) })
})
// 4. Starts a game successfully
// 5. Ends a game successfully (yes, no one will have played it)
// context('Start then stop Game - happy path', () => {
//   beforeEach(() => {
//     cy.visit('localhost:3000/SignIn?email=1&password=1')
//     cy.wait(1000);
//   });
//
//   it('Successfully create a game', () => {
//     cy.get('a[type=playGame]').eq(0)
//       .click();
//     cy.get('button[type=stopGame]')
//       .click();
//     cy.get('h2[id=greeting]')
//   })
// })
//
// // 6. Loads the results page successfully
// context('Start then stop Game - happy path', () => {
//   beforeEach(() => {
//     cy.visit('localhost:3000/SignIn?email=1&password=1')
//     cy.wait(1000);
//   });
//
//   it('Successfully create a game', () => {
//     cy.get('a[type=playGame]').eq(0)
//       .click();
//     cy.get('button[type=startGame]')
//       .click();
//     cy.get('button[type=advanceGame]')
//       .click();
//     cy.get('h2[id=greeting]')
//   })
// })
//
// context('Delete Game - happy path', () => {
//   beforeEach(() => {
//     cy.visit('localhost:3000/SignIn?email=1&password=1')
//     cy.wait(1000);
//   });
//
//   it('Successfully create a game', () => {
//     cy.get('button[type=deleteButton]')
//   })
// })
