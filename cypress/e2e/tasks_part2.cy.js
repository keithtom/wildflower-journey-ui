describe("tasks part 2", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
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
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });
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
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });
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
      cy.get("span.completedTask").should("be.visible");
      cy.logout();

      // login as partner 2 and navigate to that same step and check that partner's avatar icon appears
      cy.get("@partner2Email").then((email) => {
        cy.login(email, "password");
      });
      cy.visit("/ssj");
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone D-E-F").click();
      cy.get("span.completedTask").should("have.length", 1);
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
      cy.get("span.completedTask").should("not.exist");
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
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });
      cy.contains("Great work!").parent().next().click();

      // complete second prerequisite
      cy.contains("a li div p", /^Startup$/).click();
      cy.contains("Milestone E").click();
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Mark task complete").click();
      cy.get(".MuiPaper-root.MuiDrawer-paperAnchorRight span svg")
        .first()
        .click({
          force: true,
        });

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
