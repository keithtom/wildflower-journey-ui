const { identity } = require("lodash");

describe("onboarding spec", () => {
  beforeEach(() => {
    cy.login()
  });

  describe("inputting personal details", () => {
    beforeEach(() => {
      cy.visit("/welcome/confirm-your-details")
    })

    it("should display form", () => {
      cy.get('input[name="firstName"]').should("be.visible");
      cy.get('input[name="lastName"]').should("be.visible");
      cy.get('input[name="city"]').should("be.visible");
      cy.get('input[name="state"]').should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should be able to update fields", () => {
      cy.get('input[name="firstName"]').clear().type("newFirstName");
      cy.get('input[name="lastName"]').clear().type("newLastName");
      cy.get('input[name="city"]').clear().type("Brooklyn");
      cy.get('input[name="state"]').clear().type("New York");
      cy.get('button[type="submit"]').click();
      cy.url({timeout: 3000}).should("include", "/welcome/confirm-demographic-info");
    })
  })
  describe("confirming demographic info", () => {
    beforeEach(() => {
      cy.visit("/welcome/confirm-demographic-info")
    })

    it("should display form", () => {
      cy.contains("language");
      cy.contains("ethnicity");
      cy.contains("LGBTQIA");
      cy.contains("gender identity");
      cy.contains("pronouns");
      cy.contains("household income");
      cy.contains("Montessori Certified");
    });

    // it("should be able to update fields", () => {
      
    // });
  });
});
