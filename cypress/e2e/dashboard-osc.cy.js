describe("Open School Checklist Dashboard", () => {
  let schoolId;
  let workflowId;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetOpenSchoolFixturesAndLogin();
    cy.visit("/network", { timeout: 60000 });
    cy.wait(2000);

    // Get school ID from the first school in the navigation drawer
    cy.get('[data-cy="school-nav-item"]', { timeout: 10000 }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/school/");
    cy.url().then((url) => {
      const pathParts = url.split("/school/")[1].split("/");
      schoolId = pathParts[0];
    });
  });

  describe("visiting the open school dashboard", () => {
    it("should show the open school dashboard card", () => {
      // Navigate to Open School Checklist from nav
      cy.contains("Open School Checklist").click();
      cy.wait(2000);

      // Get the workflowId from the URL
      cy.url().then((url) => {
        const openSchoolMatch = url.match(/\/open-school\/([^/]+)/);
        if (openSchoolMatch) {
          workflowId = openSchoolMatch[1];
          cy.visit(`/school/${schoolId}/open-school/${workflowId}`, {
            timeout: 60000,
          });
          cy.get('[data-cy="open-school-dashboard-card"]', {
            timeout: 10000,
          }).should("exist");
        }
      });
    });

    it("should display welcome message and school info", () => {
      cy.contains("Open School Checklist").click();
      cy.wait(2000);
      cy.url().then((url) => {
        const openSchoolMatch = url.match(/\/open-school\/([^/]+)/);
        if (openSchoolMatch) {
          workflowId = openSchoolMatch[1];
          cy.visit(`/school/${schoolId}/open-school/${workflowId}`, {
            timeout: 60000,
          });
          cy.contains("Welcome,", { timeout: 10000 });
        }
      });
    });
  });

  describe("clicking through to the checklist", () => {
    it("should permit clicking the CTA card to access checklist", () => {
      cy.contains("Open School Checklist").click();
      cy.wait(2000);
      cy.url().then((url) => {
        const openSchoolMatch = url.match(/\/open-school\/([^/]+)/);
        if (openSchoolMatch) {
          workflowId = openSchoolMatch[1];
          cy.visit(`/school/${schoolId}/open-school/${workflowId}`, {
            timeout: 60000,
          });
          cy.get('[data-cy="open-school-checklist-cta"]', {
            timeout: 10000,
          }).click();
          cy.url().should("include", "/checklist/");
        }
      });
    });

    it("should navigate to checklist via the nav item", () => {
      cy.contains("Open School Checklist").click();
      cy.wait(1000);
      // Expand Open School Checklist nav section and click Checklist
      cy.get(".MuiDrawer-paper").contains("Checklist").click();
      cy.url().should("include", "/checklist/");
    });
  });

  describe("using the checklist", () => {
    beforeEach(() => {
      // Navigate to the checklist page
      cy.contains("Open School Checklist").click();
      cy.wait(1000);
      cy.get(".MuiDrawer-paper").contains("Checklist").click();
      cy.wait(2000);
    });

    it("should display month navigation controls", () => {
      cy.get('[data-cy="open-school-checklist-resetMonth"]', {
        timeout: 10000,
      }).should("exist");
    });

    it("should allow navigating between months", () => {
      // The month chips are displayed in the header
      // Navigate by clicking on month chips
      // Click on a different month chip
      cy.contains("Oct").click();
      cy.wait(1000);
      cy.url().should("include", "/checklist/");

      // Navigate to another month
      cy.contains("Nov").click();
      cy.wait(1000);
      cy.url().should("include", "/checklist/");

      // Reset to current month
      cy.get('[data-cy="open-school-checklist-resetMonth"]').click();
      cy.wait(1000);
    });

    it("should display milestone groups", () => {
      // The checklist page shows milestones grouped by status (In Progress, To Do, Done)
      // And by period (This Month, This Year, etc.)
      cy.contains("To Do").should("exist");
    });

    it("should navigate to milestone detail page", () => {
      // Click on a milestone to view details
      // First, find a milestone link
      cy.get(".MuiListItemButton-root").first().click();
      cy.wait(1000);
      // If we clicked into a group, find a milestone
      cy.get("body").then(($body) => {
        if ($body.find('[data-cy="milestone-page-header"]').length === 0) {
          // We're still on checklist, click on an actual milestone
          cy.get(".MuiList-root .MuiListItem-root a").first().click();
        }
      });
    });
  });

  describe("milestone page", () => {
    it("should display milestone page header and back button", () => {
      // Navigate to checklist
      cy.contains("Open School Checklist").click();
      cy.wait(1000);
      cy.get(".MuiDrawer-paper").contains("Checklist").click();
      cy.wait(2000);

      // Find and click a milestone
      cy.url().then((url) => {
        // Get year and month from URL
        const match = url.match(/\/checklist\/(\d+)\/(\d+)/);
        if (match) {
          const year = match[1];
          const month = match[2];
          // Navigate to the milestone page using the URL pattern
          // First find a milestone link and extract its ID
          cy.get("a[href*='/checklist/']")
            .first()
            .invoke("attr", "href")
            .then((href) => {
              if (href && href.includes(year)) {
                cy.visit(href, { timeout: 60000 });
                cy.get('[data-cy="milestone-page-header"]', {
                  timeout: 10000,
                }).should("exist");
                cy.get('[data-cy="milestone-page-back"]').should("exist");
              }
            });
        }
      });
    });

    it("should navigate back to checklist from milestone", () => {
      cy.contains("Open School Checklist").click();
      cy.wait(1000);
      cy.get(".MuiDrawer-paper").contains("Checklist").click();
      cy.wait(2000);

      cy.url().then((url) => {
        const match = url.match(/\/checklist\/(\d+)\/(\d+)/);
        if (match) {
          cy.get("a[href*='/checklist/']")
            .first()
            .invoke("attr", "href")
            .then((href) => {
              if (href && href.includes(match[1])) {
                cy.visit(href, { timeout: 60000 });
                cy.get('[data-cy="milestone-page-back"]', {
                  timeout: 10000,
                }).click();
                cy.url().should("include", "/checklist/");
              }
            });
        }
      });
    });
  });

  describe("resources page", () => {
    it("should navigate to resources page from nav", () => {
      cy.contains("Open School Checklist").click();
      cy.wait(1000);
      cy.get(".MuiDrawer-paper").contains("Resources").click();
      cy.url().should("include", "/resources");
    });
  });
});
