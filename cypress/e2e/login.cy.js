// These tests do not reset the database and use the test@test.com user to test logging in

describe('login spec', () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it('should display a login form', () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  })

  it("should log in successfully", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.get('div#headerAvatarIcon').should("be.visible");
  });
})

describe("visiting website for the first time via email link", () => {
  it("should authenticate and redirect to onboarding", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/invite_email_link`,
      body: {
        email: `cypress_test_${Date.now()}@test.com`
      }
    })
    .then((resp) => {
      cy.visit(resp.body.invite_url);
      cy.url({timeout: 20000}).should("include", "/welcome/new-etl");
      cy.getCookies()
        .should("have.length.greaterThan", 2)
        .should((cookies) => {
          const authCookie = cookies.find((cookie) => {
            return cookie.name === "auth";
          });
          expect(authCookie).to.not.be.undefined;
        });
    })
  })
})

// https://trello.com/c/wQZS62F9/393-error-message-when-getting-invited-to-network
describe("existing member visiting website, invite from network (no ssj)", () => {
  it("should authenticate and redirect to onboarding", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/network_invite_email_link`,
      body: {
        email: `cypress_test_${Date.now()}@test.com`,
      },
    }).then((resp) => {
      cy.visit(resp.body.invite_url);
      cy.url({ timeout: 20000 }).should("include", "/welcome/existing-member");
      cy.getCookies()
        .should("have.length.of.at.most", 2)
        .should((cookies) => {
          const authCookie = cookies.find((cookie) => {
            return cookie.name === "auth";
          });
          expect(authCookie).to.not.be.undefined;
        });
    });
  });
});