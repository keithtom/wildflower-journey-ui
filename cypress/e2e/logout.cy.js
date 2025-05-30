describe("logout spec", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-cy="login-email-input"]').type("test@test.com");
    cy.get('[data-cy="login-password-input"]').type("password");
    cy.get('[data-cy="login-submit-button"]').click();
    cy.get('[data-cy="user-profile-button"]').should("be.visible");
    cy.visit("/", { timeout: 60000 });
  });

  it("should be able to log out", () => {
    // Open user menu
    cy.get('[data-cy="user-profile-button"]').should("be.visible").click();

    // Intercept logout request
    cy.intercept("DELETE", `${Cypress.env("apiUrl")}/logout`).as("logout");

    // Click sign out - using the text content since there's no data-cy attribute
    cy.contains("Logout").should("be.visible").click();

    // Verify we're redirected to logged-out page
    cy.url().should("include", "/logged-out");
  });
});
