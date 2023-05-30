describe("dashboard spec", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/ssj", {timeout: 60000})
  });

  describe("assigning steps", () => {
    it("should allow multiple assignments and can complete", () => {
      cy.contains("Visioning").click();
      cy.contains("Milestone A").click();
      
      // Assign to Step 1
      cy.contains("Step 1").click();
      cy.contains("Add to my to do list").click();
      cy.contains("TASK ADDED").should("be.visible");
      cy.get("span[type='close']").first().click({force: true})
      cy.contains('ASSIGNEE')
      cy.get("span[type='close']").last().click({force: true})

      // Assign to Step 2
      cy.contains("Step 2").click();
      cy.contains("Add to my to do list").click();
      cy.contains("TASK ADDED").should("be.visible");
      cy.get("span[type='close']").first().click({force: true})
      cy.contains('ASSIGNEE')
      cy.get("span[type='close']").last().click({force: true})
    
      // avatar should appear 3x. Once in the header, and twice for the assignments
      cy.get('.MuiAvatar-img').should('have.length', 3);
    
      cy.contains("Your to do list").click();
      cy.contains("Step 1").should("be.visible");
      cy.contains("Step 2").should("be.visible");
    
      cy.visit("/ssj", { timeout: 60000 });
      cy.contains("You have 2 tasks").should("be.visible");
    
      cy.contains('Visioning').click();
      // check for 'Working on 2 of X remaining steps'

      cy.contains("Milestone A").click();
      cy.contains("Step 1").click();
      cy.contains("Mark task complete").click();
      cy.get('span[type="checkCircle"]').should("be.visible");
    
      cy.contains('Visioning').click();
      // check for 'Working on 1 of X remaining steps'

      cy.contains("Your to do list").click();
      cy.contains("Step 1").should("not.exist");
      cy.contains("Step 2").should("be.visible");

      // complete task from to do list
      cy.contains("Step 2").click();
      cy.contains("Mark task complete").click();
      cy.contains("Start here").should("be.visible");
      
      // uncomplete a task and unassign it
      // check that everything looks right
    });
  })
});