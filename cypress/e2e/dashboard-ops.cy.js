describe("Ops Guide Dashboard", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.login("ops_guide@test.com", "password");
    cy.visit("/your-schools", { timeout: 60000 });
    cy.wait(2000);
  });

  describe("viewing the Your Schools page", () => {
    it("should load the page and display Your Schools heading", () => {
      cy.contains("Your Schools", { timeout: 10000 });
    });

    it("should display schools grouped by phase", () => {
      // The page shows schools in phase sections (Visioning, Planning, Startup)
      // with PhaseChip components
      cy.get("#visioning-stack").should("exist");
    });

    it("should display school cards with team info", () => {
      // School cards show name, location, open date, and team members
      cy.get("#visioning-stack").within(() => {
        cy.contains("View").should("exist");
      });
    });
  });

  describe("viewing the correct navigation", () => {
    it("should contain Your Schools link in navigation", () => {
      cy.get(".MuiDrawer-paper").contains("Your Schools");
    });

    it("should contain Network link in navigation", () => {
      cy.get(".MuiDrawer-paper").contains("Network");
    });
  });

  describe("navigating to school dashboard", () => {
    it("should navigate to school dashboard when clicking View", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      // Should land on the school dashboard page
      cy.contains("Welcome,", { timeout: 10000 });
    });
  });

  describe("viewing the SSJ as an Ops Guide", () => {
    it("should be able to access school SSJ workflow", () => {
      // Click View on the first school
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      cy.wait(2000);

      // Navigate to SSJ - expand School Startup Journey in nav
      cy.contains("School Startup Journey").click();

      // Navigate to Visioning
      cy.get(".MuiDrawer-paper").contains("Visioning").click();
      cy.url().should("include", "/visioning");
      cy.get('[data-cy="visioning-header"]', { timeout: 10000 }).should(
        "exist"
      );
    });

    it("should be able to navigate through all SSJ phases", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      cy.wait(2000);

      cy.contains("School Startup Journey").click();

      // Navigate to Visioning
      cy.get(".MuiDrawer-paper").contains("Visioning").click();
      cy.url().should("include", "/visioning");
      cy.get('[data-cy="visioning-header"]', { timeout: 10000 }).should(
        "exist"
      );

      // Navigate to Planning
      cy.get(".MuiDrawer-paper").contains("Planning").click();
      cy.url().should("include", "/planning");
      cy.get('[data-cy="planning-header"]', { timeout: 10000 }).should("exist");

      // Navigate to Startup
      cy.get(".MuiDrawer-paper").contains("Startup").click();
      cy.url().should("include", "/startup");
      cy.get('[data-cy="startup-header"]', { timeout: 10000 }).should("exist");
    });

    it("should be able to navigate to Milestones page", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      cy.wait(2000);

      cy.contains("School Startup Journey").click();

      // Navigate to Milestones
      cy.get(".MuiDrawer-paper").contains("Milestones").click();
      cy.url().should("include", "/milestones");
      cy.contains("Milestones", { timeout: 10000 });
    });
  });

  describe("navigating to milestone detail", () => {
    it("should be able to navigate from milestones to a specific milestone", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      cy.wait(2000);

      cy.contains("School Startup Journey").click();

      // Navigate to Milestones
      cy.get(".MuiDrawer-paper").contains("Milestones").click();
      cy.url().should("include", "/milestones");
      cy.contains("Milestones", { timeout: 10000 });

      // Click on a milestone (e.g., Milestone B-1 if it exists)
      cy.get("body").then(($body) => {
        if ($body.text().includes("Milestone B-1")) {
          cy.contains("Milestone B-1").click();
          cy.url().should("match", /\/visioning\/|\/planning\/|\/startup\//);
        } else if ($body.text().includes("Milestone A")) {
          cy.contains("Milestone A").click();
          cy.url().should("match", /\/visioning\/|\/planning\/|\/startup\//);
        }
      });
    });
  });

  describe("accessing school to-do list", () => {
    it("should navigate to to-do list from school dashboard", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");
      cy.wait(2000);

      // Click To Do List in navigation
      cy.get(".MuiDrawer-paper").contains("To Do List").click();
      cy.url().should("include", "/to-do-list");
      cy.contains("To Do List", { timeout: 10000 });
    });
  });

  describe("accessing school profile in network", () => {
    it("should navigate to school profile from Your Schools", () => {
      cy.get("#visioning-stack").first().contains("View").click();
      cy.url().should("include", "/school/");

      // Get the schoolId from URL
      cy.url().then((url) => {
        const pathParts = url.split("/school/")[1].split("/");
        const schoolId = pathParts[0];

        // Navigate to network profile
        cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
        cy.url().should("include", "/network/schools/");
      });
    });
  });
});
