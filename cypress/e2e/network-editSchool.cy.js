import "cypress-file-upload";

describe("network edit school", () => {
  let schoolId;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetOpenSchoolFixturesAndLogin();
    cy.visit("/network", { timeout: 60000 });
    cy.wait(1000);

    // Get school ID from the first teacher leader school in the navigation
    cy.get('[data-cy="school-nav-item"]').first().click();
    cy.url().should("include", "/school/");
    cy.url().then((url) => {
      schoolId = url.split("/school/")[1];
      cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
    });
  });

  describe("editing school profile", () => {
    beforeEach(() => {
      cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
      cy.contains("Edit school profile").click();
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

    it.only("should edit teacher leaders", () => {
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
        "Chief Financial Officer"
      );

      // Edit the teacher leader
      cy.get('[data-cy="schoolId-teacherLeaders-edit-0"]').click();
      cy.get('[data-cy="schoolId-teacherLeaders-dateJoined"]')
        .clear()
        .type("2024-02-01");
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
      cy.get('[data-cy="schoolId-edit-board"]').click();
      // add
      cy.get('[data-cy="schoolId-edit-board-add"]').click();
      cy.get('[name="name"]').click();
      cy.get('[name="name"]').type("New Board Member");
      cy.get('[data-cy="schoolId-edit-board-dateJoined"]')
        .clear()
        .type("01/01/2024");
      cy.get('[data-cy="schoolId-edit-board-dateLeft"]')
        .clear()
        .type("01/01/2025");
      cy.get('[name="title"]').click();
      cy.get('[name="title"]').type("Board Chair");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // edit
      cy.get('[data-cy="schoolId-edit-board-edit-0"]').click();
      cy.get('[data-cy="schoolId-edit-board-dateJoined"]')
        .clear()
        .type("01/02/2024");
      cy.get('[data-cy="schoolId-edit-board-dateLeft"]')
        .clear()
        .type("01/01/2025");
      cy.get('[name="title"]').click();
      cy.get('[name="title"]').clear().type("Vice Chair");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // remove
      cy.get('[data-cy="schoolId-edit-board-remove"]').each(($el) => {
        cy.wrap($el).click();
      });
    });
  });
});
