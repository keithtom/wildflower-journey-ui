describe("logout spec", () => {
  beforeEach(() => {
    cy.resetFixturesAndLogin();
    cy.visit("/ssj", { timeout: 60000 });
  });

  it("should display logout link in Header", () => {
    cy.get("div#headerAvatarIcon").click();
    cy.intercept("DELETE", `${Cypress.env("apiUrl")}/logout`).as("logout");

    cy.contains("Sign out").click();
    cy.wait("@logout").its("response.statusCode").should("eq", 200);
  });
});
