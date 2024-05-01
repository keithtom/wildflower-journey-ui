describe("Admin, Instantaneous Changes", () => {
  beforeEach(() => {
    // cy.resetRolloutWorkflowFixture();
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
  });

  it("navigates to a workflow", () => {
    // Perform the first user action
    cy.contains("Basic Workflow for Cypress Tests").click();
    // Check that the URL has changed to the next page
    cy.url().should("match", /\/admin\/workflows\/\d+/);
  });

  it("reorders a process", () => {
    cy.visit("/admin/workflows/4");
    cy.get("#inline-action-tile-85").trigger("mouseover");
    cy.get("#drag-handle-85").trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-86")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a processId page", () => {
    cy.visit("/admin/workflows/4");
    cy.contains("Milestone AB").click();
    cy.url().should("include", "/admin/workflows/processes/85");
  });

  it("edits the process description", () => {
    cy.visit("/admin/workflows/processes/85");
    cy.wait(1000);
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("reorders a step", () => {
    cy.visit("/admin/workflows/processes/85");
    cy.wait(1000);
    cy.get("#inline-action-tile-222").trigger("mouseover");
    cy.get("#drag-handle-222").trigger("mousedown", { which: 1 });
    cy.get("#inline-action-tile-223")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("navigates to a stepId page", () => {
    cy.visit("/admin/workflows/processes/85");
    cy.contains("Step 1").click();
    cy.url().should("include", "/admin/workflows/processes/85/steps/222");
  });

  it("edits the step description", () => {
    cy.visit("/admin/workflows/processes/85/steps/222");
    cy.wait(1000);
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("adds a resource to a step", () => {
    cy.visit("/admin/workflows/processes/85/steps/222");
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Add resource").click();
    cy.get('input[name="resource_link"]').clear().type("www.google.com");
    cy.get('input[name="resource_title"]').clear().type("New Resource Title");
    cy.get("button.MuiButton-text").contains("Add").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("edits a resource on a step", () => {
    cy.visit("/admin/workflows/processes/85/steps/222");
    cy.wait(1000);
    cy.contains("New Resource Title").click();
    cy.get('input[name="resource_link"]')
      .clear()
      .type("www.wildflowerschools.org");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("deletes a resource on a step", () => {
    cy.visit("/admin/workflows/processes/85/steps/222");
    cy.wait(1000);
    cy.contains("New Resource Title").click();
    cy.get('input[name="delete_resource_check"]')
      .clear()
      .type("New Resource Title");
    cy.get("button.MuiButton-text").contains("Remove").click();
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });

  it("edits a decision option on a step", () => {
    cy.visit("/admin/workflows/processes/86/steps/225");
    cy.wait(1000);
    cy.contains("Option 2").click();
    cy.get('input[name="decision_option"]').clear().type("New Option 2");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.get("button.MuiButtonBase-root").contains("Update").click();
    cy.wait(1000);
    cy.contains("New Option 2").click();
    cy.get('input[name="decision_option"]').clear().type("Option 2");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
});

describe.only("Admin, Rollout Changes", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
  });
  it("navigates to a workflow", () => {
    // Perform the first user action
    cy.contains("Basic Workflow").click();
    // Check that the URL has changed to the next page
    cy.url().should("match", /\/admin\/workflows\/\d+/);
  });
  it("starts drafting a new version", () => {
    cy.contains("Basic Workflow").click();
    cy.get("button.MuiButtonBase-root").contains("Draft new version").click();
  });
  it("adds a brand new process", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
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
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.contains("Choose").click();
    cy.contains("Develop your Visioning Album").click();
    cy.contains("Develop your Visioning Album");
  });
  it("removes an existing process", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.get("button.MuiButton-text").contains("Remove").last().click();
  });
  it("removes a brand new process", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.get("button.MuiButton-text").contains("Remove").first().click();
  });
  it("reinstates the removed, existing, process", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.get("button.MuiButton-text").contains("Reinstate").first().click();
  });
  it("navigates to a process", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.contains("Milestone C-X").click();
    cy.contains("Milestone C-X");
  });
  it("elects to edit a process", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
  });
  it("updates process a attribute", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a prerequisite", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("button.MuiButton-root").contains("Add Prerequisite").click();
    cy.get("Milestone C").click();
  });
  it("removes a prerequisite", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("#remove-prerequisite-1").click();
  });
  it("adds a step", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("#inline-action-tile-add-chip").first().click();
    cy.get('input[name="title"]').type("New Test Step Title");
    cy.get('textarea[name="description"]').type("New Test Step Description");
    cy.get('input[name="max_worktime"]').type("123");
    cy.get('input[name="completion_type"]').first().check();
    cy.get("button.MuiButton-text").contains("Create Step").click();
    cy.contains("New Test Step Title");
  });
  it("removes a step", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.get("button.MuiButton-text").contains("Remove").first().click();
    // TODO: Type name of title to confirm deletion
    // TODO: Confirm delete
  });
  it("reverts all process edits", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits").click();
  });
  it("navigates to a step", () => {
    cy.visit("admin/workflows/processes/201"); // TODO: Replace with correct process id from fixture
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Edit This Process").click();
    cy.contains("Revert All Edits");
    cy.contains("Step 1").click();
    cy.contains("Step 1");
  });
  it("updates a step attribute", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.get('textarea[name="description"]').clear().type("New description");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("adds a resource", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.get("button.MuiButtonBase-root").contains("Add resource").click();
    cy.get('input[name="resource_link"]').clear().type("www.google.com");
    cy.get('input[name="resource_title"]').clear().type("New Resource Title");
    cy.get("button.MuiButton-text").contains("Add").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("updates a resource", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.contains("New Resource Title").click();
    cy.get('input[name="resource_link"]')
      .clear()
      .type("www.wildflowerschools.org");
    cy.get("button.MuiButton-text").contains("Update").click();
    cy.contains("New Resource Title");
    cy.get("button.MuiButtonBase-root").contains("Update").click();
  });
  it("makes the step a decision", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.get('span[label="kind"]').click();
  });
  it("adds a decision option", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.get('span[label="kind"]').click();
    cy.get("button.MuiButtonBase-root").contains("Add Decision Option").click();
    cy.get('input[name="decision_option"]').type("New Decision Option");
    cy.get("button.MuiButtonBase-text").contains("Add").click();
    cy.contains("New Decision Option");
  });
  it("removes a decision option", () => {
    cy.visit("/admin/workflows/processes/85/steps/222"); // TODO: Replace with correct step id from fixture
    cy.wait(1000);
    cy.get("#remove-decision-option-1").click();
  });
  it("submits a new workflow version", () => {
    cy.visit("/admin/workflows/117"); //TODO: Replace with generated fixture url
    cy.get("button.MuiButtonBase-root").contains("Review new version").click();
    cy.get("button.MuiButtonBase-root").contains("Confirm and submit").click();
  });
});
