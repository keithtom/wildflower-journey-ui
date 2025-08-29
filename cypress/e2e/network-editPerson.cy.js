import "cypress-file-upload";

describe("network edit person", () => {
  let firstName;
  let lastName;
  let id;

  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetOpenSchoolFixturesAndLogin();

    cy.getCookie("firstName")
      .should("exist")
      .then((f) => {
        firstName = f.value;
      });

    cy.getCookie("lastName")
      .should("exist")
      .then((l) => {
        lastName = l.value;
      });

    cy.getCookie("id")
      .should("exist")
      .then((i) => {
        id = i.value;
      });

    cy.visit("/network", { timeout: 60000 });
    cy.wait(1000);
  });

  describe("searching and navigating to profile", () => {
    it("should search for self and navigate to profile", () => {
      cy.get('input[name="search"]').type(`${firstName} ${lastName}`);
      cy.get(".MuiCard-root")
        .contains(`${firstName} ${lastName}`)
        .should("be.visible");
      cy.get(".MuiCard-root").contains(`${firstName} ${lastName}`).click();
      cy.contains(`${firstName} ${lastName}`).should("be.visible");
    });
  });

  describe("editing profile fields", () => {
    beforeEach(() => {
      cy.visit(`/network/people/${id}`, { timeout: 60000 });
      cy.contains("Edit profile").click();
    });

    it("should edit general fields", () => {
      cy.get('[data-cy="personId-edit-general"]').click();
      cy.get('input[name="firstName"]').clear().type("newFirstName");
      cy.get('input[name="lastName"]').clear().type("newLastName");
      cy.get('input[name="city"]').clear().type("Brooklyn");

      cy.contains("State").next().click();
      cy.contains("New York").click();
      cy.get("body").click(0, 0);

      cy.get('input[name="email"]').clear().type(`newEmail${id}@email.com`);
      cy.get('input[name="phone"]').clear().type("(123) 456 7890");
      cy.get('[name="about"]').clear().type("New about me bio");

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

    it("should edit demographic fields", () => {
      cy.get('[data-cy="personId-edit-demographic"]').click();
      cy.contains("What is your primary language?").next().click();
      cy.contains("English").click();
      cy.get("body").click(0, 0);

      cy.contains("What is your ethnicity?").next().click();
      cy.contains("American Indian or Alaska Native").click({ force: true });
      cy.contains("Asian").click({ force: true });
      cy.get("body").click(0, 0);

      cy.contains("Do you identify as a member of the LGBTQIA community?")
        .get("label")
        .first()
        .click();

      cy.contains("What is your gender identity?").next().click();
      cy.contains("Male/Man").click({ force: true });
      cy.get("body").click(0, 0);

      cy.contains("What are your pronouns?").next().click();
      cy.contains("she/her/hers").click({ force: true });
      cy.get("body").click(0, 0);

      cy.contains(
        "How would you describe the economic situation in your household while you were growing up"
      )
        .next()
        .next()
        .next()
        .children()
        .first()
        .click();
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit certification and role fields", () => {
      cy.get('[data-cy="personId-edit-certificationAndRole"]').click();
      cy.contains("Are you Montessori Certified?")
        .next()
        .children()
        .first()
        .click();
      cy.contains(
        "What Levels are you certified (or seeking certification) for?"
      )
        .next()
        .click();
      cy.contains("6-9 Elementary").click({ force: true });
      cy.contains("Primary/Early Childhood").click({ force: true });
      cy.get("body").click(0, 0);
      cy.get('[name="montessoriCertifiedYear"]').clear().type("Primary, 2024");
      // TODO: I can't get the role select to close, and it blocks the submit button.
      // cy.contains("What is your role at Wildflower Schools?").next().click();
      // cy.get(".MuiPaper-root")
      //   .contains("Foundation Partner")
      //   .click({ force: true });
      // cy.get(".MuiPaper-root")
      //   .contains("Teacher Leader")
      //   .click({ force: true });
      // cy.get("body").click(0, 0);
      cy.get('button[type="submit"]').should("not.be.disabled").click();
    });

    it("should edit school history fields", () => {
      cy.get('[data-cy="personId-edit-schoolHistory"]').click();
      // remove - cleanup any schools that might be in the list
      cy.get("body").then(($body) => {
        if (
          $body.find('[data-cy="personId-edit-schoolHistory-remove"]').length >
          0
        ) {
          cy.get('[data-cy="personId-edit-schoolHistory-remove"]').each(
            ($el) => {
              cy.wrap($el).click();
            }
          );
        }
      });
      // add
      cy.get('[data-cy="personId-edit-schoolHistory-add"]').click();
      cy.get('[name="school"]').click();
      cy.get('[name="school"]').type("Test");
      cy.wait(5000);
      cy.get('li[data-option-index="0"]').contains("Test").click();
      cy.get('[data-cy="personId-edit-schoolHistory-dateJoined"]')
        .clear()
        .type("01/01/2014");
      cy.get('[data-cy="personId-edit-schoolHistory-dateLeft"]')
        .clear()
        .type("01/01/2024");
      cy.get('[name="schoolTitle"]').click();
      cy.get('[name="schoolTitle"]').type("CFO");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // edit
      cy.get('[data-cy="personId-edit-schoolHistory-edit-0"]').click();
      cy.get('[data-cy="personId-edit-schoolHistory-dateJoined"]')
        .clear()
        .type("01/02/2014");
      cy.get('[data-cy="personId-edit-schoolHistory-dateLeft"]')
        .clear()
        .type("01/01/2024");
      cy.get('[name="schoolTitle"]').click();
      cy.get('[name="schoolTitle"]').clear().type("CEO");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // remove
      cy.get('[data-cy="personId-edit-schoolHistory-remove"]').each(($el) => {
        cy.wrap($el).click();
      });
    });

    it("should edit board history fields", () => {
      cy.get('[data-cy="personId-edit-boardHistory"]').click();
      // remove - cleanup any schools that might be in the list
      cy.get("body").then(($body) => {
        if (
          $body.find('[data-cy="personId-edit-boardHistory-remove"]').length > 0
        ) {
          cy.get('[data-cy="personId-edit-boardHistory-remove"]').each(
            ($el) => {
              cy.wrap($el).click();
            }
          );
        }
      });
      // add
      cy.get('[data-cy="personId-edit-boardHistory-add"]').click();
      cy.get('[name="school"]').click();
      cy.get('[name="school"]').type("Test");
      cy.wait(5000);
      cy.get('li[data-option-index="0"]').contains("Test").click();
      cy.get('[data-cy="personId-edit-boardHistory-dateJoined"]')
        .clear()
        .type("01/01/2014");
      cy.get('[data-cy="personId-edit-boardHistory-dateLeft"]')
        .clear()
        .type("01/01/2024");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // edit
      cy.get('[data-cy="personId-edit-boardHistory-edit-0"]').click();
      cy.get('[data-cy="personId-edit-boardHistory-dateJoined"]')
        .clear()
        .type("01/02/2014");
      cy.get('[data-cy="personId-edit-boardHistory-dateLeft"]')
        .clear()
        .type("01/01/2024");
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // remove
      cy.get('[data-cy="personId-edit-boardHistory-remove"]').each(($el) => {
        cy.wrap($el).click();
      });
    });
  });
});
