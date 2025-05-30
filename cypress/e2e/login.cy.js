// These tests do not reset the database and use the test@test.com user to test logging in

describe("login spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display a login form", () => {
    cy.get('[data-cy="login-email-input"]').should("be.visible");
    cy.get('[data-cy="login-password-input"]').should("be.visible");
    cy.get('[data-cy="login-submit-button"]').should("be.visible");
  });

  it("should log in successfully", () => {
    cy.get('[data-cy="login-email-input"]').type("test@test.com");
    cy.get('[data-cy="login-password-input"]').type("password");
    cy.get('[data-cy="login-submit-button"]').click();
    cy.get('[data-cy="user-profile-button"]').should("be.visible");
  });
});
