// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("resetFixturesAndLogin", () => {
  const timestamp = Date.now();
  const email = `cypress_test_${timestamp}@test.com`;

  cy.request({
    method: "PUT",
    url: `${Cypress.env("apiUrl")}/reset_fixtures`,
    body: {
      email: email,
    },
  }).then((resp) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        user: {
          email: email,
          password: "password",
        },
      },
    }).then((resp) => {
      window.cookieStore.set("auth", resp.headers.authorization);
      window.cookieStore.set(
        "workflowId",
        resp.body.data.attributes.ssj.workflowId
      );
      window.cookieStore.set(
        "phase",
        resp.body.data.attributes.ssj.currentPhase
      );
    });
  });
});
