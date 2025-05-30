import "cypress-file-upload";

describe("network edit school", () => {
  let schoolId;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetOpenSchoolFixturesAndLogin();
    cy.visit("/network", { timeout: 60000 });
    cy.wait(1000);

    // Get school ID from the first school in the list
    cy.contains("Schools").click();
    cy.get('input[name="search"]').type("Wild Rose Montessori");
    cy.contains("Wild Rose Montessori").click();
    cy.url().then((url) => {
      schoolId = url.split("/").pop();
    });
  });

  describe("editing school profile", () => {
    beforeEach(() => {
      cy.visit(`/network/schools/${schoolId}`, { timeout: 60000 });
      cy.contains("Edit profile").click();
    });

    it("should edit general information", () => {
      cy.get('[data-cy="schoolId-edit-general"]').click();
      cy.get('input[name="name"]').clear().type("New School Name");
      cy.get('input[name="city"]').clear().type("New City");
      cy.contains("State").next().click();
      cy.contains("New York").click();
      cy.get("body").click(0, 0);
      cy.get('input[name="zip"]').clear().type("12345");
      cy.get('input[name="website"]').clear().type("https://newschool.com");
      cy.get('[name="about"]').clear().type("New school description");

      cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as("upload");
      cy.fixture("test_profile_picture.jpg").then((filecontent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: filecontent.toString(),
          fileName: "test_profile_picture.jpg",
          mimeType: "image/jpg",
        });
      });
      cy.wait("@upload", { requestTimeout: 60000 });
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit school details", () => {
      cy.get('[data-cy="schoolId-edit-details"]').click();
      cy.contains("What type of school is this?").next().click();
      cy.contains("Public Charter").click();
      cy.get("body").click(0, 0);

      cy.contains("What age range does this school serve?").next().click();
      cy.contains("3-6").click({ force: true });
      cy.contains("6-9").click({ force: true });
      cy.get("body").click(0, 0);

      cy.contains("What is the school's status?").next().click();
      cy.contains("Open").click();
      cy.get("body").click(0, 0);

      cy.get('[name="openingDate"]').clear().type("01/01/2024");
      cy.get('[name="enrollment"]').clear().type("100");
      cy.get('[name="capacity"]').clear().type("120");
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit school location", () => {
      cy.get('[data-cy="schoolId-edit-location"]').click();
      cy.contains("What is the school's address type?").next().click();
      cy.contains("Standalone").click();
      cy.get("body").click(0, 0);

      cy.get('[name="address"]').clear().type("123 Main St");
      cy.get('[name="unit"]').clear().type("Suite 100");
      cy.get('button[type="submit"]').should("not.be.disabled").click();
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
