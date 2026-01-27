import "cypress-file-upload";

describe("network edit school", () => {
  let schoolId;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetOpenSchoolFixturesAndLogin();
    // Navigate to a page where the user's nav drawer will show their schools
    // The nav drawer appears on school pages after login
    cy.visit("/network", { timeout: 60000 });
    cy.wait(2000);

    // Get school ID from the first school in the navigation drawer
    // The school-nav-item is in the nav drawer, click to expand and navigate
    cy.get('[data-cy="school-nav-item"]', { timeout: 10000 }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/school/");
    cy.url().then((url) => {
      // Extract schoolId - URL is /school/{schoolId} or /school/{schoolId}/...
      const pathParts = url.split("/school/")[1].split("/");
      schoolId = pathParts[0];
      cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
    });
  });

  describe("editing school profile", () => {
    beforeEach(() => {
      cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
      cy.get('[data-cy="schoolId-edit-school-profile"]', { timeout: 10000 }).click();
    });

    it("should edit general information", () => {
      cy.get('[data-cy="schoolId-general"]').click();

      // City field
      cy.get('input[name="city"]').clear().type("New City");

      // State field
      cy.contains("State").next().click();
      cy.contains("New York").click();
      cy.get("body").click(0, 0);

      // Open Date field
      cy.get('[data-cy="schoolId-open-date"]').clear().type("2024-01-01");

      // About field
      cy.get('[name="about"]').clear().type("New school description");

      // School Logo Image
      cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as("upload");
      cy.fixture("test_profile_picture.jpg").then((filecontent) => {
        cy.get('input[type="file"]').first().attachFile({
          fileContent: filecontent.toString(),
          fileName: "test_profile_picture.jpg",
          mimeType: "image/jpg",
        });
      });
      cy.wait("@upload", { requestTimeout: 60000 });

      // Save changes
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit school details", () => {
      cy.get('[data-cy="schoolId-enrollment"]').click();

      // Ages Served (MultiSelect)
      cy.contains("Ages served").next().click();
      cy.contains("Primary").click({ force: true });
      cy.contains("Lower Elementary").click({ force: true });
      cy.get("body").click(0, 0);

      // Governance Type
      cy.contains("Governance type").next().click();
      cy.contains("Charter").click();
      cy.get("body").click(0, 0);

      // Charter Group (only if governance type is Charter)
      cy.contains("Charter Group").then(($el) => {
        if ($el.length) {
          cy.wrap($el).next().click();
          cy.contains(
            "Wildflower Montessori Public Schools of Colorado"
          ).click();
          cy.get("body").click(0, 0);
        }
      });

      // Maximum Enrollment
      cy.get('input[name="maxEnrollment"]').clear().type("100");

      // Number of Classrooms
      cy.get('input[name="numClassrooms"]').clear().type("5");

      // Save changes
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit teacher leaders", () => {
      cy.get('[data-cy="schoolId-teacherLeaders"]').click();
      cy.get('[data-cy="schoolId-teacherLeaders-add"]').click();
      cy.get('input[placeholder="e.g. Katelyn Shore"]').type("a");
      cy.get(".MuiAutocomplete-option").first().click();
      cy.get('[data-cy="schoolId-teacherLeaders-dateJoined"]')
        .clear()
        .type("01/01/2024");
      cy.get('input[placeholder="e.g. Chief Financial Officer"]')
        .clear()
        .type("Lead Teacher");
      cy.get('button[type="submit"]').click();
      cy.wait(1000);

      // Verify the new teacher leader is added
      cy.get('[data-cy="schoolId-teacherLeaders-list-item"]').should(
        "contain",
        "Lead Teacher"
      );

      // Edit the teacher leader
      cy.get('[data-cy="schoolId-teacherLeaders-edit-0"]').click();
      cy.get('[data-cy="schoolId-teacherLeaders-dateJoined"]')
        .clear()
        .type("02/01/2024");
      cy.get('input[name="schoolTitle"]').clear().type("Senior Lead Teacher");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // Verify the teacher leader is updated
      cy.get('[data-cy="schoolId-teacherLeaders-list-item"]').should(
        "contain",
        "Senior Lead Teacher"
      );

      // Remove the teacher leader
      cy.get('[data-cy="schoolId-teacherLeaders-remove-0"]').click();
      cy.get('[data-cy="schoolId-teacherLeaders-list-item"]').should(
        "not.exist"
      );
    });

    it("should edit school board", () => {
      cy.get('[data-cy="schoolId-boardMembers"]').click();
      // add
      cy.get('[data-cy="schoolId-boardMembers-add"]').click();
      cy.get('[name="name"]').click();
      cy.get('[name="name"]').type("New Board Member");
      cy.get('[data-cy="schoolId-boardMembers-dateJoined"]')
        .clear()
        .type("01/01/2024");
      cy.get('[name="title"]').click();
      cy.get('[name="title"]').type("Board Chair");
      cy.get('button[type="submit"]').should("not.be.disabled").click();
      cy.wait(1000);

      // Verify the new board member is added
      cy.get('[data-cy="schoolId-boardMembers-list-item"]').should(
        "contain",
        "New Board Member"
      );

      // edit
      cy.get('[data-cy="schoolId-boardMembers-edit-0"]').click();
      cy.get('[data-cy="schoolId-boardMembers-dateJoined"]')
        .clear()
        .type("01/02/2024");
      cy.get('[name="title"]').click();
      cy.get('[name="title"]').clear().type("Vice Chair");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // Verify the board member is updated
      cy.get('[data-cy="schoolId-boardMembers-list-item"]').should(
        "contain",
        "Vice Chair"
      );

      // remove
      cy.get('[data-cy="schoolId-boardMembers-remove-0"]').click();
      cy.get('[data-cy="schoolId-boardMembers-list-item"]').should(
        "not.exist"
      );
    });
  });
});
