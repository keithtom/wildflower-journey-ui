describe("visioning spec", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/ssj", { timeout: 60000 });
    cy.viewport(1280, 832);
  });

  describe("assigning steps", () => {
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
      // uncomplete a task and unassign it
      // check that everything looks right
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

      // TODO: Go back to the milestone from “up next” that said “Hold up”, complete all its prerequisite milestones and check that the milestone is now in “Todo”
    });
  });

  describe("decision steps", () => {
    it.only("should allow a decision to be selected and submitted", () => {
      cy.contains("Visioning").click();
      cy.contains("Milestone B-1").click();
      cy.contains("Decision Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("Option 1").click();
      cy.contains("Make final decision").click();
      cy.contains("Decision made").should("be.visible");
      cy.reload();
      cy.contains("Decided").should("be.visible");
    });
  });
});
