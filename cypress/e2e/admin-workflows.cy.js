describe("Admin, Instantaneous Changes", () => {
  beforeEach(() => {
    cy.resetRolloutWorkflowFixture();
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
    cy.intercept("GET", `v1/workflow/definition/workflows/*`).as("getWorkflow");
    cy.intercept("GET", `v1/workflow/definition/workflows/*/processes/*`).as(
      "getProcess"
    );
    cy.intercept("GET", `v1/workflow/definition/processes/*/steps/*`).as(
      "getStep"
    );
  });

  it("navigates to a workflow", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
  });

  it("reorders a process", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.get("#inline-action-tile-milestone-a").trigger("mouseover");
    cy.get("#drag-handle-milestone-a").trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-milestone-b-1")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a processId page", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
  });

  it("edits the process description", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("reorders a step", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
    cy.get("#inline-action-tile-step-1").first().trigger("mouseover");
    cy.get("#drag-handle-step-1").first().trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-step-2")
      .first()
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a stepId page", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
    cy.contains("Step 1").click();
    cy.wait("@getStep");
    cy.contains("Step 1");
  });

  it("edits the step description", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
    cy.contains("Step 1").click();
    cy.wait("@getStep");
    cy.contains("Step 1");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("adds a resource to a step and edits it and deletes it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.contains("Milestone A");
    cy.contains("Step 1").click();
    cy.wait("@getStep");
    cy.contains("Step 1");
    cy.get("button.MuiButtonBase-root").contains("Add resource").click();
    cy.get('input[name="resource_link"]')
      .clear()
      .type("https://www.google.com");
    cy.get('input[name="resource_title"]').clear().type("New Resource Title");
    cy.get("button.MuiButton-text").contains("Add").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
    cy.wait(1000);
    cy.contains("New Resource Title").click();
    cy.get('input[name="resource_link"]')
      .clear()
      .type("https://www.wildflowerschools.org");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
    cy.wait(1000);
    cy.contains("New Resource Title").click();
    cy.get('input[name="delete_resource_check"]')
      .clear()
      .type("New Resource Title");
    cy.get("button.MuiButton-text").contains("Remove").click();
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("edits a decision option on a step and deletes it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.contains("Milestone C-X").click();
    cy.wait("@getProcess");
    cy.contains("Milestone C-X");
    cy.contains("Collaborative Decision Step 1").click();
    cy.wait("@getStep");
    cy.contains("Collaborative Decision Step 1");
    cy.contains("Option 1").click();
    cy.get('input[name="decision_option"]').clear().type("New Option 1");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.get("button.MuiButtonBase-root").contains("Update").click();
    cy.wait(1000);
    cy.get("#remove-decision-option-0").contains("Remove").click();
  });
});
