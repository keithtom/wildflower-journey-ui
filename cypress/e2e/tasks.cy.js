describe("tasks", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });
  describe("single user", () => {
    beforeEach(() => {
      cy.resetFixturesAndLogin();
      cy.visit("/ssj", { timeout: 60000 });
    });
    describe("assigning tasks", () => {
      it("should allow multiple assignments and can complete", () => {
        // navigate to the visioning phase page
        cy.get('[data-cy="visioning-nav-item"]').click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get('[data-cy="visioning-header"]').click();
        // navigate to Milestone A page
        cy.contains("Milestone A").click();

        // assign any user to Step 1
        cy.contains("Step 1").click();
        cy.get(`[data-cy="assign-user-button-drawer-${"Step 1"}"]`).click();
        cy.get('[data-cy="assignable-user"]').first().click();
        cy.contains("TASK ADDED").should("be.visible");
        // close the drawer
        cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
          .first()
          .click({
            force: true,
          });

        // assign any user to Step 2
        cy.contains("Step 2").click();
        cy.get(`[data-cy="assign-user-button-drawer-${"Step 2"}"]`).click();
        cy.get('[data-cy="assignable-user"]').first().click();
        cy.contains("TASK ADDED").should("be.visible");
        // close the drawer
        cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
          .first()
          .click({
            force: true,
          });

        // verify 2 tasks assigned by: avatar should appear 3x. Once in the header, and twice for the assignments
        cy.get(".MuiAvatar-img").should("have.length", 3);

        cy.contains("To do list").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/to-do-list"
        );
        // check for something that will be present on the to do list page
        cy.contains("Your to do list", { timeout: 60000 }).should("be.visible");
        cy.contains("Step 1").should("be.visible");
        cy.contains("Step 2").should("be.visible");

        cy.visit("/ssj", { timeout: 60000 });
        cy.contains("You have 2 tasks").should("be.visible");

        cy.contains("Visioning").click({ timeout: 10000 });
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Working on 2 of 3 remaining tasks").should("be.visible");

        cy.contains("Milestone A").click();
        cy.contains("Step 1").click();
        cy.contains("Mark task complete").click();
        cy.get("span.completedTask").should("be.visible");

        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Working on 1 of 2 remaining tasks").should("be.visible");

        cy.contains("To do list").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/to-do-list"
        );
        // check for something that will be present on the to do list page
        cy.contains("Your to do list", { timeout: 60000 }).should("be.visible");
        cy.contains("Step 1").should("not.exist");
        cy.contains("Step 2").should("be.visible");

        // complete task from to do list
        cy.contains("Step 2").click();
        cy.contains("Mark task complete").click();
        cy.contains("Start here").should("be.visible");

        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("2 of 3 tasks completed").should("be.visible");
        cy.visit("/ssj", { timeout: 60000 });
        cy.contains(
          "Looks like you don't have any tasks on your to do list!"
        ).should("be.visible");

        // Selecting a milestone that has prerequisites
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Up Next").should("be.visible");
        cy.contains("Milestone B-2").click();
        cy.contains("Hold up!").should("be.visible");

        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("Mark task complete").click();

        // Go to the planning phase and assign and complete a task.
        cy.contains("Planning").click();
        cy.contains("Milestone C").click();
        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("Mark task complete").click();

        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Milestone A").click();
        cy.contains("Step 2").click();
        cy.contains("Mark incomplete").click();
        cy.contains("Remove from to do list").click();
      });

      it("should allow uncompleting and unassigning a step", () => {
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Milestone A").click();
        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("Mark task complete").click();
        cy.contains("Step 1").click();
        cy.contains("Mark incomplete").click();
        cy.contains("Remove from to do list").click();
        cy.get("span.completedTask").should("not.exist");
      });

      it("should move a milestone from Up Next to To Do when prerequisites are complete", () => {
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Up Next").should("be.visible");
        cy.contains("Milestone B-2").click();
        cy.contains("Hold up!").should("be.visible");
        cy.contains("Milestone B-1").click();
        cy.contains("Milestone B-2").should("not.exist");
        cy.contains("Milestone B-1").click();
        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("Option 1").click();
        cy.contains("Make final decision").click();
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        // Milestone B-2 should now be in the To Do section
        cy.contains("Milestone B-2")
          .prev()
          .get("span.rightArrowCircle")
          .should("be.visible");
      });
    });

    describe("decision tasks", () => {
      it("should allow a decision to be selected and submitted", () => {
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Milestone B-1").click();
        cy.contains("Decision Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.get("#info-drawer-close").first().click({
          force: true,
        });

        // Check that you can access decision in the to do list
        cy.contains("To do list").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/to-do-list"
        );
        // check for something that will be present on the to do list page
        cy.contains("Your to do list", { timeout: 60000 }).should("be.visible");
        cy.contains("Decision Step 1").click();
        cy.get("#info-drawer-close").first().click({
          force: true,
        });

        // Check that you can select an option and submit
        cy.contains("Visioning").click();
        cy.location("pathname", { timeout: 60000 }).should(
          "include",
          "/visioning"
        );
        // check for something that will be present on the visioning page
        cy.get("#visioning-header");
        cy.contains("Milestone B-1").click();
        cy.contains("Decision Step 1").click();
        cy.contains("Option 1").click();
        cy.contains("Make final decision").click();
        cy.contains("Decided").should("be.visible");
      });
    });
  });

  describe("individual task for partners", () => {
    beforeEach(() => {
      cy.resetPartnerFixtures().then((emails) => {
        emails.forEach((email, i) => {
          cy.wrap(email).as(`partner${i + 1}Email`);
        });
      });
    });

    it("can be assigned to both partners", () => {
      // login as partner 1 and assign task to themselves. check that avatar icon appears
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get(".MuiSnackbar-root span svg").click({ force: true });
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment

      // assign task to partner 2
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get(".MuiSnackbar-root span svg").click({ force: true });
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });
      cy.get(".MuiAvatar-img").should("have.length", 3); //once in the header and twice in the assignment
      cy.logout();
    });

    it("can be marked complete by both partners", () => {
      // login as partner 1 and assign and complete task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get("span.completedTask").should("be.visible");
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.get("span.checkCircleAssignee").should("have.length", 1);
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get("span.checkCircleAssignee").should("have.length", 2);
      cy.logout();
    });

    it("can be marked incomplete by both partners", () => {
      //// SETUP
      // login as partner 1 and assign and complete task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.logout();
      // login as partner 2 and assign and complete tasks
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.logout();

      //// TEST
      // login as partner 1 and mark task incomplete
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").should(
        "have.css",
        "text-decoration-line",
        "line-through"
      );
      cy.contains("Step 1").click();
      cy.contains("Mark incomplete").click();
      cy.contains("Step 1").should("have.css", "text-decoration-line", "none");
      cy.logout();

      // login as partner 2 and mark task incomplete
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").should(
        "have.css",
        "text-decoration-line",
        "line-through"
      );
      cy.contains("Step 1").click();
      cy.contains("Mark incomplete").click();
      cy.contains("Step 1").should("have.css", "text-decoration-line", "none");
      cy.logout();
    });

    it("should allow a step to be unassigned by both partners", () => {
      //// SETUP
      // login as partner 1 and assign a task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.logout();
      // login as partner 2 and assign a task
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.logout();

      //// TEST
      // unassign task as partner 1
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.get('[data-cy="visioning-nav-item"]').click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 3);
      cy.contains("Step 1").click();
      cy.contains("Remove from to do list").click();
      cy.get(".MuiAvatar-img").should("have.length", 3);
      cy.logout();
      // unassign task as partner 2
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/visioning"
      );
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 2);
      cy.contains("Step 1").click();
      cy.contains("Remove from to do list").click();
      cy.get(".MuiAvatar-img").should("have.length", 2);
      cy.logout();
    });
  });
});
