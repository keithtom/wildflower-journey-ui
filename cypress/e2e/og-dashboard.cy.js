describe("network", () => {
  describe("ops guide", () => {
    beforeEach(() => {
      cy.viewport(1280, 832);
      cy.login("ops_guide@test.com", "password");
      cy.visit("/your-schools", { timeout: 60000 });
    });
    describe("Viewing the OG Dashboard", () => {
      it("should load the page", () => {
        cy.contains("Your Schools");
      });
    });
    describe("Viewing the correct navigation", () => {
      it("should contain Your Schools string", () => {
        cy.get(".MuiDrawer-paper").contains("Your Schools");
      });
    });
    describe("Viewing the ssj as an ops guide", () => {
      it("should be able to click through a school's ssj", () => {
        cy.get("#visioning-stack").first().contains("View").click();
        cy.url().should("include", "/to-do-list");

        cy.get(".MuiDrawer-paper").contains("Milestones").click();
        cy.url().should("include", "/milestones");
        cy.contains("Milestones");

        cy.get(".MuiDrawer-paper").contains("Visioning").click();
        cy.url().should("include", "/visioning");
        cy.contains("Visioning");

        cy.get(".MuiDrawer-paper").contains("Planning").click();
        cy.url().should("include", "/planning");
        cy.contains("Planning");

        cy.get(".MuiDrawer-paper").contains("Startup").click();
        cy.url().should("include", "/startup");
        cy.contains("Startup");
      });
    });
    describe("Navigating between SSJ pages", () => {
      it("should be able to navigate from /milestones to a milestone", () => {
        cy.get("#visioning-stack").first().contains("View").click();
        cy.url().should("include", "/to-do-list");

        cy.get(".MuiDrawer-paper").contains("Milestones").click();
        cy.url().should("include", "/milestones");
        cy.contains("Milestones");
        cy.contains("Milestone B-1").click();
      });
    });
  });
});
