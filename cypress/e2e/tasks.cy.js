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
        cy.contains("Visioning").click();
        cy.contains("Milestone A").click();

        // Assign to Step 1
        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("TASK ADDED").should("be.visible");
        cy.get("span[type='close']").first().click({ force: true });
        cy.contains("ASSIGNEE");
        cy.get("span[type='close']").last().click({ force: true });

        // Assign to Step 2
        cy.contains("Step 2").click();
        cy.contains("Add to my to do list").click();
        cy.contains("TASK ADDED").should("be.visible");
        cy.get("span[type='close']").first().click({ force: true });
        cy.contains("ASSIGNEE");
        cy.get("span[type='close']").last().click({ force: true });

        // avatar should appear 3x. Once in the header, and twice for the assignments
        cy.get(".MuiAvatar-img").should("have.length", 3);

        cy.contains("Your to do list").click();
        cy.contains("Step 1").should("be.visible");
        cy.contains("Step 2").should("be.visible");

        cy.visit("/ssj", { timeout: 60000 });
        cy.contains("You have 2 tasks").should("be.visible");

        cy.contains("Visioning").click({ timeout: 10000 });
        cy.contains("Working on 2 of 3 remaining tasks").should("be.visible");

        cy.contains("Milestone A").click();
        cy.contains("Step 1").click();
        cy.contains("Mark task complete").click();
        cy.get('span[type="checkCircle"]').should("be.visible");

        cy.contains("Visioning").click();
        cy.contains("Working on 1 of 2 remaining tasks").should("be.visible");

        cy.contains("Your to do list").click();
        cy.contains("Step 1").should("not.exist");
        cy.contains("Step 2").should("be.visible");

        // complete task from to do list
        cy.contains("Step 2").click();
        cy.contains("Mark task complete").click();
        cy.contains("Start here").should("be.visible");

        cy.contains("Visioning").click();
        cy.contains("2 of 3 tasks completed").should("be.visible");
        cy.visit("/ssj", { timeout: 60000 });
        cy.contains(
          "Looks like you don't have any tasks on your to do list!"
        ).should("be.visible");

        // Selecting a milestone that has prerequisites
        cy.contains("Visioning").click();
        cy.contains("Up Next").should("be.visible");
        cy.contains("Milestone B-2").click();
        cy.contains("Hold up!").should("be.visible");
        cy.contains("Milestone B-1").click();

        // Able to complete a task before prequisites are complete
        cy.go("back");
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
        cy.contains("Milestone A").click();
        cy.contains("Step 2").click();
        cy.contains("Mark incomplete").click();
        cy.contains("Remove from to do list").click();
      });

      it("should allow uncompleting and unassigning a step", () => {
        cy.contains("Visioning").click();
        cy.contains("Milestone A").click();
        cy.contains("Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.contains("Mark task complete").click();
        cy.contains("Step 1").click();
        cy.contains("Mark incomplete").click();
        cy.contains("Remove from to do list").click();
        cy.get('span[type="checkCircle"]').should("not.exist");
      });

      it("should move a milestone from Up Next to To Do when prerequisites are complete", () => {
        cy.contains("Visioning").click();
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
        cy.get("span[type='close']").first().click();
        cy.contains("Visioning").click();
        // Milestone B-2 should now be in the To Do section
        cy.contains("Milestone B-2")
          .prev()
          .get("span[type='rightArrowCircle']")
          .should("be.visible");
      });
    });

    describe("decision tasks", () => {
      it("should allow a decision to be selected and submitted", () => {
        cy.contains("Visioning").click();
        cy.contains("Milestone B-1").click();
        cy.contains("Decision Step 1").click();
        cy.contains("Add to my to do list").click();
        cy.get("span[type='close']").first().click();

        // Check that you can access decision in the to do list
        cy.contains("Your to do list").click();
        cy.contains("Decision Step 1").click();
        cy.get("span[type='close']").first().click();

        // Check that you can select an option and submit
        cy.contains("Visioning").click();
        cy.contains("Milestone B-1").click();
        cy.contains("Decision Step 1").click();
        cy.contains("Option 1").click();
        cy.contains("Make final decision").click();
        cy.contains("Decision made").should("be.visible");
        cy.reload();
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

    it.only("can be assigned to both partners", () => {
      // login as partner 1 and assign task to themselves. check that avatar icon appears
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get("span[type='close']").last().click({ force: true });
      cy.get("span[type='close']").first().click({ force: true });
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment

      // assign task to partner 2
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get("span[type='close']").last().click({ force: true });
      cy.get("span[type='close']").first().click({ force: true });
      cy.get(".MuiAvatar-img").should("have.length", 3); //once in the header and twice in the assignment
      cy.logout();
    });

    it("can be marked complete by both partners", () => {
      // login as partner 1 and assign and complete task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="checkCircle"]').should("be.visible");
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.get('span[type="checkCircle"]').should("have.length", 1);
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="checkCircle"]').should("have.length", 2);
      cy.logout();
    });

    it("can be marked incomplete by both partners", () => {
      //// SETUP
      // login as partner 1 and assign and complete task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
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
      cy.contains("Visioning").click();
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
      cy.contains("Visioning").click();
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
      cy.contains("Visioning").click();
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
      cy.contains("Visioning").click();
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
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 3);
      cy.contains("Step 1").click();
      cy.contains("Remove from to do list").click();
      cy.get(".MuiAvatar-img").should("have.length", 2);
      cy.logout();
      // unassign task as partner 2
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      cy.get(".MuiAvatar-img").should("have.length", 2);
      cy.contains("Step 1").click();
      cy.contains("Remove from to do list").click();
      cy.get(".MuiAvatar-img").should("have.length", 1);
      cy.logout();
    });
  });

  describe("collaborative task for partners", () => {
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
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.contains("Collaborative Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get("span[type='close']").last().click({ force: true });
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment
      cy.logout();

      // // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.get(".MuiAvatar-img").should("have.length", 2); //once in the header and once in the assignment

      // assign task to partner 2
      cy.contains("Collaborative Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("ASSIGNEE");
      cy.get("span[type='close']").last().click({ force: true });
      cy.get(".MuiAvatar-img").should("have.length", 3); //once in the header and twice in the assignment
      cy.logout();
    });

    it("can be marked complete/incomplete and unassigned by ONLY one partner", () => {
      // login as partner 1 and assign and complete task
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.contains("Collaborative Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="checkCircle"]').should("be.visible");
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.get('span[type="checkCircle"]').should("have.length", 2);
      cy.contains("Collaborative Step 1").should(
        "have.css",
        "text-decoration-line",
        "line-through"
      );
      cy.contains("Collaborative Step 1").click();
      cy.contains("Completed by").should("be.visible");
      cy.contains("Add to my to do list").should("not.exist");
      cy.contains("Mark incomplete").should("not.exist");
      cy.logout();

      //login as partner 1 and incomplete and unassign it
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.contains("Collaborative Step 1").click();
      cy.contains("Mark incomplete").click();
      cy.contains("Remove from to do list").click();
      cy.get('span[type="checkCircle"]').should("not.exist");
      cy.logout();
    });

    it("can have prerequisites", () => {
      // login as partner 1 and assign task to themselves. check that avatar icon appears
      cy.get("@partner1Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.contains("Hold up! Try something else first.").should("exist");

      // complete first prerequisite
      cy.contains("Milestone D").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="close"]').first().click();
      cy.get('span[type="close"]').last().click();

      // complete second prerequisite
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone E").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="close"]').first().click({ force: true });
      cy.get('span[type="close"]').last().click({ force: true });

      // check that there is no Hold up
      cy.contains("a li div p", /^Startup$/).click({ force: true });
      cy.contains("Milestone D-E-F").should("exist");
      cy.contains("To do").should("exist");
      cy.contains("Hold up! Try something else first.").should("not.exist");
      cy.logout();

      // login as partner 2 and navigate to the same milestone and check that its in the to do section
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").should("exist");
      cy.contains("To do").should("exist");
      cy.contains("Hold up! Try something else first.").should("not.exist");
      cy.logout();
    });
  });
});
