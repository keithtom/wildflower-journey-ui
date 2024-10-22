describe("open school checklist", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });
  describe("teacher leader", () => {
    beforeEach(() => {
      cy.resetOpenSchoolFixturesAndLogin();
      cy.visit("/open-school", { timeout: 60000 });
      cy.wait(5000);
    });
    describe("visiting the open school dashboard", () => {
      it("should show up", () => {
        cy.get('[data-cy="open-school-dashboard-card"]').should("exist");
      });
    });
    describe("clicking through to the checklist", () => {
      it("should permit clicking the cta card", () => {
        cy.get('[data-cy="open-school-checklist-cta"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
      });
    });
    describe("clicking through to the checklist via the nav", () => {
      it("should permit clicking the nav item", () => {
        cy.get('[data-cy="open-school-checklist-navItem"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
      });
      it("should permit clicking the checklist to do list", () => {
        cy.get('[data-cy="open-school-checklist-toDoList"]').click();
      });
    });
    describe("using the checklist", () => {
      it("should allow navigating", () => {
        cy.get('[data-cy="open-school-checklist-cta"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
        // navigate to next month
        cy.get('[data-cy="open-school-checklist-nextMonth"]').click();
        cy.get('[data-cy="open-school-checklist-nextMonth"]').click(); //double so that resetting works
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
        // navigate to prior month
        cy.get('[data-cy="open-school-checklist-prevMonth"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
        // reset to current month
        cy.get('[data-cy="open-school-checklist-resetMonth"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
        // click to milestone
        cy.contains("Milestone A").click();
        cy.get('[data-cy="milestone-page-header"]').should("exist");
        cy.contains("Milestone A").should("exist");
        // back to checklist
        cy.get('[data-cy="milestone-page-back"]').click();
        cy.get('[data-cy="open-school-checklist-month"]').should("exist");
      });
    });
  });
  // NOTE: tasks, assigning, completing, uncompleting, etc are covered in tasks.cy.js and tasks_part2.cy.js
});
