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

describe("Admin, Rollout Changes", () => {
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
  it("starts drafting a new version", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
  });
  it("adds a brand new process", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.contains("Create").click();
    cy.get('input[name="title"]').type("New Test Process Title");
    cy.get('textarea[name="description"]').type("New Test Process Description");
    cy.get("div#categories").click();
    cy.get('li[data-value="Finance"]').click();
    cy.get("button.MuiButton-text").contains("Create").click();
    cy.contains("New Test Process Title");
  });
  it("adds an existing process", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.contains("Choose").click();
    cy.contains("Preview the Wildflower budget process").click();
    cy.contains("Preview the Wildflower budget process");
  });
  it("removes an existing process and reinstates it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Remove").first().click();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Reinstate").first().click();
  });
  it("removes a brand new process", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.contains("Choose").click();
    cy.contains("Preview the Wildflower budget process").click();
    cy.contains("Preview the Wildflower budget process");
    cy.get("button.MuiButton-text").contains("Remove").first().click();
  });

  it("navigates to a proces and elects to edit it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
  });
  it("updates process a attribute", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a prerequisite and removes it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone C-Y").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("button.MuiButton-root").contains("Add Prerequisite").click();
    cy.contains("Milestone C-X").click();
    cy.wait(1000);
    cy.get("#remove-prerequisite-1").click();
  });

  it("adds a step and removes it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.get("div.MuiDialog-container").within(() => {
      cy.get('input[name="title"]').type("New Test Step Title");
      cy.get('textarea[name="description"]').type("New Test Step Description");
      cy.get('input[name="max_worktime"]').type("123");
      cy.contains("Individual").click();
      cy.get("button.MuiButton-text").contains("Create Step").click();
    });
    cy.contains("New Test Step Title");
    cy.wait(1000);
    cy.get("#remove-step-new-test-step-title").click();
    cy.get("div.MuiDialog-container").within(() => {
      cy.get('input[name="delete_step_check"]').type("New Test Step Title");
      cy.get("button.MuiButton-text").contains("Remove").click();
    });
  });

  it("reverts all process edits", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits").click();
  });
  it("navigates to a step and edits it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.wait(1000);
    cy.contains("Step 1").click();
    cy.wait("@getStep");
    cy.contains("Step 1");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a resource and updates it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.wait(1000);
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
  });

  it("makes the step a decision and adds an option and removes it", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.contains("Milestone A").click();
    cy.wait("@getProcess");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.wait(1000);
    cy.contains("Step 1").click();
    cy.wait("@getStep");
    cy.contains("Step 1");
    cy.get('span[label="Kind"]').click();
    cy.get("button.MuiButtonBase-root").contains("Add Decision Option").click();
    cy.get("div.MuiDialog-container").within(() => {
      cy.get('input[name="decision_option"]').type("New Decision Option");
      cy.get("button.MuiButton-text").contains("Add").click();
    });
    cy.contains("New Decision Option");
    cy.get("button.MuiButton-root").contains("Update").click();
    cy.wait(1000);
    cy.get("#remove-decision-option-0").click();
  });
  it.only("submits a new workflow version", () => {
    cy.contains("Basic Workflow for Cypress Tests").click();
    cy.wait("@getWorkflow");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Remove").first().click();
    cy.contains("Review New Version").click();
    cy.wait("@getWorkflow");
    cy.contains("Confirm And Submit").click();
  });
});
