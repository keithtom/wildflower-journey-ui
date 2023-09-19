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
Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      user: {
        email: email,
        password: password,
      },
    },
  }).then((resp) => {
    window.cookieStore.set("auth", resp.headers.authorization);
    window.cookieStore.set(
      "workflowId",
      resp.body.data.attributes.ssj.workflowId
    );
    window.cookieStore.set("phase", resp.body.data.attributes.ssj.currentPhase);
    window.cookieStore.set("firstName", resp.body.data.attributes.firstName);
    window.cookieStore.set("lastName", resp.body.data.attributes.lastName);
    window.cookieStore.set("id", resp.body.data.id);
    console.log(resp);
  });
});

function resetFixtures() {
  const timestamp = Date.now();
  const email = `cypress_test_${timestamp}@test.com`;

  cy.request({
    method: "PUT",
    url: `${Cypress.env("apiUrl")}/reset_fixtures`,
    body: {
      email: email,
    },
  });
  return email;
}

function resetPartnerFixtures() {
  const timestamp = Date.now();
  const email1 = `cypress_test_partner1_${timestamp}@test.com`;
  const email2 = `cypress_test_partner2_${timestamp}@test.com`;

  cy.request({
    method: "PUT",
    url: `${Cypress.env("apiUrl")}/reset_partner_fixtures`,
    body: {
      emails: [email1, email2],
    },
  });
  return [email1, email2];
}

Cypress.Commands.add("resetFixtures", () => {
  cy.wrap(resetFixtures());
});

// Used with tests that are testing partner workflows
Cypress.Commands.add("resetPartnerFixtures", () => {
  cy.wrap(resetPartnerFixtures());
});

Cypress.Commands.add("resetFixturesAndLogin", () => {
  cy.resetFixtures().then((email) => {
    cy.login(email, "password");
  });
});

Cypress.Commands.add("logout", () => {
  window.cookieStore.delete("auth");
  window.cookieStore.delete("phase");
  window.cookieStore.delete("workflowId");
});
