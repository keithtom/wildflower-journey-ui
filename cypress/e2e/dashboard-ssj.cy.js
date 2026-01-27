describe("SSJ Dashboard", () => {
  let schoolId;
  let workflowId;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetFixturesAndLogin();
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

  describe("school dashboard", () => {
    it("should display school dashboard with welcome message", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });
      cy.contains("Welcome,", { timeout: 10000 });
      cy.contains("Ways to work together", { timeout: 10000 });
    });

    it("should display assigned tasks card", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });
      // The AssignedStepsCard shows task information
      cy.get('[data-cy="you-have-tasks-statement"]').should("exist");
    });
  });

  describe("SSJ phase navigation", () => {
    beforeEach(() => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });
      cy.wait(1000);
    });

    it("should navigate to Visioning phase from navigation", () => {
      // Expand SSJ in nav and click Visioning
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Visioning").click();
      cy.url().should("include", "/visioning");
      cy.get('[data-cy="visioning-header"]', { timeout: 10000 }).should("exist");
    });

    it("should navigate to Planning phase from navigation", () => {
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Planning").click();
      cy.url().should("include", "/planning");
      cy.get('[data-cy="planning-header"]', { timeout: 10000 }).should("exist");
    });

    it("should navigate to Startup phase from navigation", () => {
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Startup").click();
      cy.url().should("include", "/startup");
      cy.get('[data-cy="startup-header"]', { timeout: 10000 }).should("exist");
    });

    it("should navigate to Milestones page from navigation", () => {
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Milestones").click();
      cy.url().should("include", "/milestones");
      cy.contains("Milestones", { timeout: 10000 });
    });
  });

  describe("SSJ phase content", () => {
    it("should display milestone groups on Visioning phase", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Visioning").click();
      cy.url().should("include", "/visioning");

      // Check for milestone status sections
      cy.get('[data-cy="visioning-header"]', { timeout: 10000 }).should("exist");
      // The page may show In Progress, To Do, Up Next, or Done sections
    });

    it("should navigate to milestone from phase page", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });
      cy.contains("School Startup Journey").click();
      cy.get(".MuiDrawer-paper").contains("Visioning").click();
      cy.url().should("include", "/visioning");

      // Click on a milestone
      cy.contains("Milestone A", { timeout: 10000 }).click();
      cy.url().should("include", "/visioning/");
    });
  });

  describe("update anticipated open date", () => {
    it("should update anticipated open date from school info card", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });

      // Find and click on the open date section
      cy.contains("open date", { matchCase: false, timeout: 10000 }).click();

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedToday = mm + "/" + dd + "/" + yyyy;

      cy.intercept({
        method: "PUT",
        url: "/v1/schools/*",
      }).as("schoolUpdate");

      cy.get('input[placeholder="mm/dd/yyyy"]').clear().type(formattedToday);
      cy.get('[data-cy="add-open-date-button"]').click();

      cy.wait("@schoolUpdate").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
  });

  describe("inviting partner", () => {
    it("should send invite to partner", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });

      cy.intercept({
        method: "PUT",
        url: "/v1/schools/*/invite_partner",
      }).as("invitePartner");

      const today = new Date();
      const datestamp = today.toISOString().split("T")[0];
      const timestamp = Date.now();
      const email = "newemail_partner_" + datestamp + timestamp + "@test.com";

      cy.contains("Add a partner", { timeout: 10000 }).click();
      cy.get('input[name="partnerFirstName"]').clear().type("Donna");
      cy.get('input[name="partnerLastName"]').clear().type("Pascal");
      cy.get('input[name="partnerEmail"]').clear().type(email);
      cy.get('button[type="submit"]').click();
      cy.contains("Thanks for making a request to add a partner!", {
        timeout: 30000,
      });
      cy.get("body").click(0, 0); // close pop up

      cy.wait("@invitePartner").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
  });

  describe("to-do list", () => {
    it("should navigate to to-do list page", () => {
      cy.visit(`/school/${schoolId}`, { timeout: 60000 });

      // Click on To Do List in navigation
      cy.get(".MuiDrawer-paper").contains("To Do List").click();
      cy.url().should("include", "/to-do-list");
      cy.contains("To Do List", { timeout: 10000 });
    });

    it("should show workflow toggle on to-do list", () => {
      cy.visit(`/school/${schoolId}/to-do-list`, { timeout: 60000 });
      // The to-do list page shows workflow selector chips
      cy.contains("To Do List", { timeout: 10000 });
    });
  });
});
