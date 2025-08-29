describe("Admin, Instantaneous Changes", () => {
  beforeEach(() => {
    cy.resetRolloutWorkflowFixture();
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
  });

  it("navigates to a workflow", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
  });

  it("reorders a process", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.get("#inline-action-tile-milestone-a").trigger("mouseover");
    cy.get("#drag-handle-milestone-a").trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-milestone-b-1")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a processId page", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
  });

  it("edits the process description", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("reorders a step", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.get("#inline-action-tile-step-1").first().trigger("mouseover");
    cy.get("#drag-handle-step-1").first().trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-step-2")
      .first()
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a stepId page", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.navigateToStep("Step 1");
    cy.contains("Step 1");
  });

  it("edits the step description", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.navigateToStep("Step 1");
    cy.contains("Step 1");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("adds a resource to a step and edits it and deletes it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.navigateToStep("Step 1");
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
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone C-X");
    cy.contains("Milestone C-X");
    cy.navigateToStep("Collaborative Decision Step 1");
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
  });
  it("navigates to a workflow", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
  });
  it("starts drafting a new version", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
  });
  it("adds a brand new process", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
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
  // Commented out because "choose" is not an option
  // it("adds an existing process", () => {
  //   cy.contains("Basic Workflow for Cypress Tests").click();
  //   cy.wait("@getWorkflow");
  //   cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
  //   cy.wait(1000);
  //   cy.get("#inline-action-tile-add-chip").first().click();
  //   cy.contains("Choose").click();
  //   cy.contains("Preview the Wildflower budget process").click();
  //   cy.contains("Preview the Wildflower budget process");
  // });
  it("removes an existing process and reinstates it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Remove").first().click();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Reinstate").first().click();
  });
  // Commented out because "choose" is not an option
  // it("removes a brand new process", () => {
  //   cy.contains("Basic Workflow for Cypress Tests").click();
  //   cy.wait("@getWorkflow");
  //   cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
  //   cy.wait(1000);
  //   cy.get("#inline-action-tile-add-chip").first().click();
  //   cy.contains("Choose").click();
  //   cy.contains("Preview the Wildflower budget process").click();
  //   cy.contains("Preview the Wildflower budget process");
  //   cy.get("button.MuiButton-text").contains("Remove").first().click();
  // });

  it("navigates to a proces and elects to edit it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
  });
  it("updates process attribute", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.get("button.MuiButtonBase-root").contains("Draft New Version").click();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a prerequisite and removes it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone C-Y");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
    cy.get("button.MuiButton-root").contains("Add Prerequisite").click();
    cy.contains("Milestone C-X").click();
    cy.wait(1000);
    cy.get("#remove-prerequisite-1").click();
  });

  it("adds a step and removes it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
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
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.editProcess("Milestone A");
    cy.contains("Revert All Edits").click();
  });
  it("navigates to a step and edits it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
    cy.wait(1000);
    cy.navigateToStep("Step 1");
    cy.contains("Step 1");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a resource and updates it", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
    cy.wait(1000);
    cy.navigateToStep("Step 1");
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
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.navigateToProcess("Milestone A");
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Revert All Edits");
    cy.wait(1000);
    cy.navigateToStep("Step 1");
    cy.contains("Step 1");
    cy.get('span[label="Kind"]').click();
    cy.get('input[name="decision_question"]').type("New Decision Question");
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
  it("submits a new workflow version", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.startDraftingNewVersion();
    cy.wait(1000);
    cy.get("button.MuiButton-text").contains("Remove").first().click();

    // Set up the intercept BEFORE clicking the button that triggers the request
    cy.intercept("GET", "**/v1/workflow/definition/workflows/*").as(
      "getWorkflow"
    );

    cy.contains("Review New Version").click();
    cy.wait("@getWorkflow");
    cy.contains("Confirm And Submit").click();
  });
});

describe("Admin, Translations", () => {
  beforeEach(() => {
    cy.resetRolloutWorkflowFixture();
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
  });
  it("navigates to a processId page and edits a PROCESS translation string", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.get('[data-cy="edit-language-button"]').click();
    cy.get("div.MuiDialog-container").within(() => {
      //process fields
      cy.get('[name="process_title_es"]').type("Milestone A (ES)");
      cy.get('[name="process_description_es"]').type(
        "Milestone A Description (ES)"
      );
      cy.get("button.MuiButtonBase-root").contains("Save").first().click();
    });
  });
  it("navigates to a processId page and edits a STEP translation string", () => {
    cy.navigateToWorkflow("Basic Workflow for Cypress Tests");
    cy.navigateToProcess("Milestone A");
    cy.contains("Milestone A");
    cy.get('[data-cy="edit-language-button"]').click();
    cy.get("div.MuiDialog-container").within(() => {
      //step fields
      cy.contains("Step 1").click();
      cy.get('[name="title_es"]').type("Step 1 (ES)");
      cy.get('[name="description_es"]').type("Step 1 Description (ES)");

      cy.get("button.MuiButtonBase-root").contains("Save").first().click();
    });
  });
});
