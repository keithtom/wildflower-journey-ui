describe("Admin, Instantaneous Changes", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password");
    cy.visit("/admin/workflows");
  });

  it("navigates to a workflow", () => {
    // Perform the first user action
    cy.contains("Basic Workflow").click();

    // Check that the URL has changed to the next page
    cy.url().should("include", "/admin/workflows/4");
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
