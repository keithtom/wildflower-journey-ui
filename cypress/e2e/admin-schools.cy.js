describe("admin spec", () => {
  describe("viewing the admin dashboard", () => {
    beforeEach(() => {
      cy.login("test@test.com", "password");
      cy.visit("/network");
    });
    it("should display admin link in user menu and redirect", () => {
      // Click the user profile button to open menu
      cy.get('[data-cy="user-profile-button"]').click();
      // Check for and click Switch to Admin
      cy.get('[data-cy="switch-to-admin-button"]').click();
      // Verify we're on the admin dashboard
      cy.url().should("include", "/admin");
    });
  });
  describe("adding a school", () => {
    beforeEach(() => {
      cy.login("test@test.com", "password");
      cy.visit("/admin/schools");
    });
    it("should be able to add a school", () => {
      // Click add button to open modal
      cy.get('[data-cy="add-school-button"]').click();

      // Search for existing person and select first result
      cy.get('[data-cy="search-person-input"]').type("a");
      cy.get('[role="listbox"]').find('[role="option"]').first().click();

      // Add a new person
      cy.get('[data-cy="new-person-first-name"]').type("newFirstName");
      cy.get('[data-cy="new-person-last-name"]').type("newLastName");
      cy.get('[data-cy="new-person-email"]').type(
        `newEmail${new Date().valueOf()}@email.com`
      );
      cy.get('[data-cy="add-new-person-button"]').click();

      // Remove a person if needed
      cy.get('[data-cy="remove-person-button"]').first().click();

      // Click next to proceed to OG selection
      cy.get('[data-cy="next-button-add-people"]').click();

      // Select OG (Daniela Vasan)
      cy.get('[data-cy="og-radio-group"]').contains("Daniela Vasan").click();
      cy.get('[data-cy="next-button-select-og"]').click();

      // Select RE (Daniela Vasan)
      cy.get('[data-cy="re-radio-group"]').contains("Daniela Vasan").click();
      cy.get('[data-cy="next-button-select-re"]').click();

      // Select Basic Workflow
      cy.get('[data-cy="workflow-radio-group"]')
        .contains("Basic Workflow")
        .click();
      cy.get('[data-cy="next-button-select-workflow"]').click();

      // Verify summary and invite
      cy.contains("newFirstName newLastName");
      cy.get('[data-cy="invite-button"]').click();
    });
  });
});

describe("School Management", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin/schools");
    cy.get("[data-cy=school-list]", { timeout: 10000 }).should("be.visible");
    cy.contains("[data-cy=school-list-item]", "Cypress Test School").click();

    // Set up all the intercepts needed for subsequent tests
    cy.intercept("GET", "**/v1/search?q=*&models=people*").as("getPeople");
    cy.intercept("GET", "**/v1/schools/*").as("getSchoolDetail");
    cy.intercept("GET", "**/v1/workflow/definition/workflows").as(
      "getWorkflowDefinitions"
    );
    cy.intercept("GET", "**/v1/workflow/workflows/*").as("getWorkflow");
  });

  it("should add a person to the school", () => {
    // Add a new person
    cy.contains("Add Person").click();
    cy.get('[data-cy="search-person-input"]').type("a");
    cy.wait("@getPeople");
    cy.get('[role="listbox"]').find('[role="option"]').first().click();

    // Wait for the first modal transition to complete
    cy.wait(300); // Material-UI modal transition is 225ms

    // Select role - target exact "Teacher Leader" not "Emerging Teacher Leader"
    cy.get("[data-cy=role-select]").click();
    cy.get('[role="listbox"]')
      .find('[role="option"]:not(.Mui-disabled)')
      .contains("Teacher Leader")
      .click();

    // Submit the form
    cy.get("[data-cy=add-person-submit]").click();
    cy.get("[data-cy=add-person-modal]").should("not.exist");

    // Wait for the changes to be saved and the UI to update
    cy.wait(1000);

    // Verify the person was added with the correct role
    cy.contains("Teacher Leader").should("exist");
  });

  it("should edit a person's roles", () => {
    // Edit the person's roles
    cy.get("[data-cy=edit-person-button]").first().click();
    cy.get("[data-cy=role-checkboxes]").should("be.visible");

    // Uncheck Teacher Leader and check other roles
    cy.get('[data-cy="role-checkbox-Teacher Leader"]')
      .find('input[type="checkbox"]')
      .uncheck();
    cy.get('[data-cy="role-checkbox-Ops Guide"]')
      .find('input[type="checkbox"]')
      .check();
    cy.get('[data-cy="role-checkbox-Board Member"]')
      .find('input[type="checkbox"]')
      .check();

    // Save changes and verify roles immediately after modal closes
    cy.get("[data-cy=save-person-role-button]").click();
    cy.wait(1000);
    cy.get("[data-cy=edit-person-modal]").should("not.exist");

    // Verify the new roles are present
    cy.get("[data-cy=person-list]")
      .find("[data-cy=person-list-item]")
      .first()
      .find(".MuiListItemText-secondary")
      .should("contain", "Ops Guide")
      .should("contain", "Board Member");
  });

  it("should remove a person from the school", () => {
    // Remove person
    cy.get("[data-cy=edit-person-button]").first().click();
    cy.get("[data-cy=remove-person-button]").click();

    // Get the person's name from the removal confirmation text
    cy.get(".MuiDialogContent-root").then(($content) => {
      const text = $content.text();
      const personName = text.match(/To remove (.*), please type/)[1];

      // Confirm removal
      cy.get("[data-cy=remove-person-confirm-input]").type(personName);
      cy.get("[data-cy=remove-person-end-date]").type("2024-12-31");
      cy.get("[data-cy=confirm-remove-person-button]").click();

      // Verify person is moved to Former People section
      cy.contains("Former People").should("be.visible");
      cy.contains(personName).should("exist");
    });
  });

  it("should edit school details", () => {
    // Click the edit details button
    cy.get('[data-cy="edit-details-button"]').click();

    // Wait for the modal to be visible
    cy.get('[data-cy="edit-details-modal"]').should("be.visible");

    // Text Inputs
    cy.get('[data-cy="school-name-input"] input')
      .clear()
      .type("Updated School Name");
    cy.get('[data-cy="school-city-input"] input').clear().type("Updated City");
    cy.get('[data-cy="school-about-input"] textarea')
      .first()
      .clear()
      .type("Updated school description", { force: true });

    // State Select
    cy.get('[data-cy="school-state-select"]').click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .first()
      .click();
    cy.get("body").click(0, 0); // Close dropdown

    // Date Inputs
    cy.get('[data-cy="school-open-date-input"] input')
      .clear()
      .type("2023-01-01");
    cy.get('[data-cy="school-expected-start-date-input"] input')
      .clear()
      .type("2023-09-01");

    // Ages Served (Multiple Select)
    cy.get('[data-cy="school-ages-served-select"]').click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .contains("Infants")
      .click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .contains("Toddlers")
      .click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .contains("Primary")
      .click();
    cy.get("body").click(0, 0); // Close dropdown

    // Governance Type Select
    cy.get('[data-cy="school-governance-type-select"]').click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .contains("Charter")
      .click();
    cy.get("body").click(0, 0); // Close dropdown

    // Charter Group Select (appears when governance type is Charter)
    cy.get('[data-cy="school-charter-group-select"]').click();
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]')
      .first()
      .click();
    cy.get("body").click(0, 0); // Close dropdown

    // Numeric Inputs
    cy.get('[data-cy="school-max-enrollment-input"] input').clear().type("100");
    cy.get('[data-cy="school-num-classrooms-input"] input').clear().type("5");

    // Save the changes
    cy.get('[data-cy="save-school-details"]').click();

    // Wait for the modal to close
    cy.get('[data-cy="edit-details-modal"]').should("not.exist");

    // Verify the changes are reflected on the page
    cy.contains("Updated School Name").should("be.visible");
    cy.contains("Updated school description").should("be.visible");
    cy.contains("Updated City").should("be.visible");
    cy.contains("January 1, 2023").should("be.visible");
    cy.contains("Infants, Toddlers, Primary").should("be.visible");
    cy.contains("Charter").should("be.visible");
    cy.contains("00").should("be.visible");
    cy.contains("5").should("be.visible");
  });

  it("should add a workflow to the school", () => {
    // Click the Add Workflow button
    cy.get('[data-cy="add-workflow-button"]').click();

    // Wait for the modal to be visible
    cy.get('[data-cy="add-workflow-modal"]').should("be.visible");

    // Select a workflow from the dropdown
    cy.get('[data-cy="workflow-select"]').click();

    // Wait for the options to be visible and select the first non-disabled option
    cy.get('[role="presentation"]')
      .find('[role="listbox"]')
      .find('[role="option"]:not(.Mui-disabled)')
      .first()
      .click();

    cy.get("body").click(0, 0); // Close dropdown

    // Submit the form
    cy.get('[data-cy="add-workflow-submit"]').click();

    // Wait for the modal to close
    cy.get('[data-cy="add-workflow-modal"]').should("not.exist");

    // Verify the workflow was added to the list
    cy.get('[data-cy="workflow-list"]').should("be.visible");
    cy.get('[data-cy="workflow-list-item"]').should("have.length.gt", 0);
  });

  it("should manage administrative actions", () => {
    // Set Status
    cy.get('[data-cy="set-status-button"]').click();
    cy.get('[data-cy="status-select"]').click();
    cy.get('[role="listbox"]').find('[role="option"]').contains("Open").click();
    cy.get('[data-cy="save-status-button"]').click();
    cy.get('[data-cy="set-status-modal"]').should("not.exist");
    cy.contains("Current status: Open").should("be.visible");

    // Set Membership
    cy.get('[data-cy="set-membership-button"]').click();
    cy.get('[data-cy="member-switch"]').should("have.class", "Mui-checked");
    cy.get('[data-cy="affiliation-date-input"]').type("2024-01-01");
    cy.get('[data-cy="save-membership-button"]').click();
    cy.get('[data-cy="edit-member-modal"]').should("not.exist");
    cy.contains("Current status: Affiliated on 2024-01-01").should(
      "be.visible"
    );

    // Toggle Visible in Directory
    cy.get('[data-cy="directory-visible-switch"]').click();

    // Remove School
    cy.get('[data-cy="remove-school-button"]').click();
    cy.get('[data-cy="remove-school-confirm-input"]').type(
      "Cypress Test School"
    );
    cy.get('[data-cy="confirm-remove-school-button"]').click();

    // Verify redirection to schools list
    cy.url().should("include", "/admin/schools");
    cy.get('[data-cy="school-list"]').should("be.visible");
  });
});
