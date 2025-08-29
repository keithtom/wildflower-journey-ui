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
});

describe("People Management", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin/people");
    // Wait for the people data to load
    cy.intercept("GET", "**/v1/people*").as("getPeople");
    cy.wait("@getPeople");

    // Check if there are people on the first page, if not, paginate
    cy.get("[data-cy=people-list]").then(($list) => {
      if ($list.find("[data-cy=people-list-item]").length === 0) {
        // No people on first page, try next page
        cy.get('button[aria-label="Go to next page"]').then(($nextButton) => {
          if ($nextButton.length && !$nextButton.prop("disabled")) {
            cy.wrap($nextButton).click();
            cy.wait("@getPeople");
            cy.get("[data-cy=people-list]").should("be.visible");
          }
        });
      }
    });
  });

  describe("adding a person", () => {
    it("should be able to add a new person", () => {
      // Click add button to open modal
      cy.get('[data-cy="add-person-button"]').click();

      // Fill in person details
      cy.get('[data-cy="new-person-first-name"]').type("newFirstName");
      cy.get('[data-cy="new-person-last-name"]').type("newLastName");
      cy.get('[data-cy="new-person-email"]').type(
        `newEmail${new Date().valueOf()}@email.com`
      );

      // Select roles
      cy.get('[data-cy="role-select"]')
        .find('input[type="radio"]')
        .first()
        .check();

      // Submit the form
      cy.get('[data-cy="add-person-submit"]').click();
    });
  });

  describe("editing person details", () => {
    it("should edit person details", () => {
      // Wait for list to be visible and scroll first item into view
      cy.get('[data-cy="people-list-item"]')
        .should("be.visible")
        .first()
        .scrollIntoView()
        .click();

      // Wait for edit button to be visible and click it
      cy.get('[data-cy="edit-person-button"]').should("be.visible").click();

      // Wait for the form to be fully loaded
      cy.get('[data-cy="person-first-name-input"]').should("be.visible");
      cy.get('[data-cy="person-first-name-input"]').should("not.be.disabled");

      // Edit basic information
      cy.get('[data-cy="person-first-name-input"]')
        .clear()
        .type("Updated First");
      cy.get('[data-cy="person-last-name-input"]').clear().type("Updated Last");

      // Store the email value for later verification
      const timestamp = new Date().valueOf();
      const email = `updated${timestamp}@example.com`;
      cy.get('[data-cy="person-email-input"]').clear().type(email);

      cy.get('[data-cy="person-phone-input"]').clear().type("123-456-7890");
      cy.get('[data-cy="person-city-input"]').clear().type("Updated City");
      cy.get('[data-cy="person-state-select"]').click();
      cy.get('[role="option"]').contains("New York").click();
      cy.get('[data-cy="person-about-input"]')
        .clear()
        .type("Updated about section");

      // Edit demographics
      cy.get('[data-cy="person-primary-language-select"]').click();
      cy.get('[role="option"]').contains("Spanish - Español").click();
      cy.get('[data-cy="person-gender-select"]').click();
      cy.get('[role="option"]').contains("Female/Woman").click();
      cy.get('[data-cy="person-pronouns-select"]').click();
      cy.get('[role="option"]').contains("she/her/hers").click();

      // Handle race/ethnicity autocomplete
      cy.get('[data-cy="person-race-ethnicity-input"]').click().type("Asian");
      cy.get('[role="option"]').contains("Asian, or Asian American").click();
      // Ensure the autocomplete is closed
      cy.get('[role="option"]').should("not.exist");

      // Edit certification
      cy.get('[data-cy="person-montessori-certified-select"]').click();
      cy.get('[role="option"]').contains("Yes").click();
      cy.get('[data-cy="person-montessori-levels-input"]').click();
      cy.get('[role="option"]').contains("Primary/Early Childhood").click();
      // Ensure the autocomplete is closed
      cy.get('[role="option"]').should("not.exist");
      cy.get('[data-cy="person-montessori-year-input"]').clear().type("2020");

      // Click save and wait for the modal to close
      cy.get('[data-cy="save-person-button"]').click();

      // Wait for the modal to be removed from the DOM
      cy.get('[role="dialog"]').should("not.exist");

      // Scroll to the top of the page
      cy.window().scrollTo("top");

      // Now check for the edit button
      cy.get('[data-cy="edit-person-button"]').should("be.visible");

      // Verify the updated data appears on the page
      cy.get('[data-cy="person-detail-firstName"]')
        .scrollIntoView()
        .should("contain", "Updated First");
      cy.get('[data-cy="person-detail-lastName"]')
        .scrollIntoView()
        .should("contain", "Updated Last");
      cy.get('[data-cy="person-detail-email"]')
        .scrollIntoView()
        .find(".MuiListItemText-secondary") // Find the secondary text element
        .should("have.text", email); // Use the stored email value
      cy.get('[data-cy="person-detail-phone"]')
        .scrollIntoView()
        .should("contain", "123-456-7890");
      cy.get('[data-cy="person-detail-location"]')
        .scrollIntoView()
        .should("contain", "Updated City, NY");
      cy.get('[data-cy="person-detail-about"]')
        .scrollIntoView()
        .should("contain", "Updated about section");
      cy.get('[data-cy="person-detail-primaryLanguage"]')
        .scrollIntoView()
        .should("contain", "Spanish - Español");
      cy.get('[data-cy="person-detail-gender"]')
        .scrollIntoView()
        .should("contain", "Female/Woman");
      cy.get('[data-cy="person-detail-pronouns"]')
        .scrollIntoView()
        .should("contain", "she/her/hers");
      cy.get('[data-cy="person-detail-raceEthnicity"]')
        .scrollIntoView()
        .should("contain", "Asian, or Asian American");
      cy.get('[data-cy="person-detail-montessoriCertified"]')
        .scrollIntoView()
        .should("contain", "Yes");
      cy.get('[data-cy="person-detail-montessoriCertifiedLevels"]')
        .scrollIntoView()
        .should("contain", "Primary/Early Childhood");
      cy.get('[data-cy="person-detail-montessoriCertifiedYear"]')
        .scrollIntoView()
        .should("contain", "2020");
    });
  });

  describe("managing person roles", () => {
    it("should be able to modify person roles", () => {
      // Find and click on the person
      cy.get("[data-cy=people-list-item]").first().click();

      // Wait for the edit roles button to be visible and click it
      cy.get('[data-cy="edit-roles-button"]').should("be.visible").click();

      // Wait for the roles modal to be visible
      cy.get('[role="dialog"]').should("be.visible");

      // Verify the info card is present
      cy.contains("Note that for ETL, TL, and WS roles").should("be.visible");

      // Modify roles - select multiple roles
      cy.get('[data-cy="role-checkboxes"]').should("be.visible");

      // Select Teacher Leader role
      cy.get('[data-cy="role-checkbox-Teacher Leader"]')
        .find('input[type="checkbox"]')
        .check();

      // Select Operations Guide role
      cy.get('[data-cy="role-checkbox-Ops Guide"]')
        .find('input[type="checkbox"]')
        .check();

      // Save changes
      cy.get('[data-cy="save-roles-button"]').click();

      // Wait for the modal to close
      cy.get('[role="dialog"]').should("not.exist");

      // Verify the roles are updated in the UI
      cy.get('[data-cy="current-roles-list"]')
        .should("contain", "Teacher Leader")
        .and("contain", "Ops Guide");

      // Reopen the roles modal to verify the selections persisted
      cy.get('[data-cy="edit-roles-button"]').click();

      // Verify the checkboxes are still checked
      cy.get('[data-cy="role-checkbox-Teacher Leader"]')
        .find('input[type="checkbox"]')
        .should("be.checked");
      cy.get('[data-cy="role-checkbox-Ops Guide"]')
        .find('input[type="checkbox"]')
        .should("be.checked");

      // Close the modal
      cy.get('[data-cy="cancel-roles-button"]').click();
    });
  });

  describe("administrative actions", () => {
    it("should be able to perform all administrative actions", () => {
      // Find and click on the person
      cy.get("[data-cy=people-list-item]").first().click();

      // Reset Password
      cy.get('[data-cy="reset-password-button"]').click();
      cy.get('[role="dialog"]').should("be.visible");
      cy.contains("Send Reset Email").click();
      cy.get('[role="dialog"]').should("not.exist");

      // Toggle directory visibility
      cy.get('[data-cy="directory-visible-switch"]')
        .should("be.visible")
        .find('input[type="checkbox"]')
        .then(($input) => {
          const initialState = $input.prop("checked");
          cy.wrap($input).click();
          // Verify the switch changed to the opposite state
          cy.wrap($input).should("have.prop", "checked", !initialState);
        });

      // Remove person
      cy.get('[data-cy="remove-person-button"]').click();
      cy.get('[role="dialog"]').should("be.visible");

      // Get the person's name from the modal text and use it for confirmation
      cy.contains('To remove "')
        .invoke("text")
        .then((text) => {
          const personName = text.match(/To remove "(.*?)"/)[1];
          cy.get('[data-cy="confirm-name-input"]').type(personName);
        });

      cy.get('[data-cy="confirm-remove-person-button"]').click();
      cy.get('[role="dialog"]').should("not.exist");
    });
  });
});
