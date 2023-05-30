const { EqualOff } = require("styled-icons/fluentui-system-filled")

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
    cy.get('input[name="email"]').type("cypress_test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url({timeout: 60000}).should("include", "/ssj");
  });
})