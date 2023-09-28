import "cypress-file-upload";

describe("onboarding spec", () => {
  beforeEach(() => {
    cy.resetFixturesAndLogin();
  });

  describe("inputting personal details", () => {
    beforeEach(() => {
      cy.visit("/welcome/confirm-your-details");
    });

    it("should display form", () => {
      cy.get('input[name="firstName"]').should("be.visible");
      cy.get('input[name="lastName"]').should("be.visible");
      cy.get('input[name="city"]').should("be.visible");
      cy.contains("State").should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should be able to update fields", () => {
      cy.get('input[name="firstName"]').clear().type("newFirstName");
      cy.get('input[name="lastName"]').clear().type("newLastName");
      cy.get('input[name="city"]').clear().type("Brooklyn");
      cy.contains("State").next().click();
      cy.contains("New York").click();
      cy.get("body").click(0, 0); // close dropdwon
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 10000 }).should(
        "include",
        "/welcome/confirm-demographic-info"
      );
    });
  });

  describe("confirming demographic info", () => {
    beforeEach(() => {
      cy.visit("/welcome/confirm-demographic-info");
    });

    it("should display form", () => {
      cy.contains("language");
      cy.contains("ethnicity");
      cy.contains("LGBTQIA");
      cy.contains("gender identity");
      cy.contains("pronouns");
      cy.contains("economic situation in your household");
      cy.contains("Montessori Certified");
    });

    it("should be able to update fields", () => {
      cy.contains("What is your primary language?").next().click();
      cy.contains("English").click();
      cy.get("body").click(0, 0); // close dropdwon

      cy.contains("What is your ethnicity?").next().click();
      cy.contains("American Indian or Alaska Native").click({ force: true });
      cy.contains("Asian").click({ force: true });
      cy.get("body").click(0, 0); // close dropdwon

      cy.contains("Do you identify as a member of the LGBTQIA community?")
        .get("label")
        .first()
        .click();

      cy.contains("What is your gender identity?").next().click();
      cy.contains("Male/Man").click({ force: true });
      cy.get("body").click(0, 0); // close dropdwon

      cy.contains("What are your pronouns?").next().click();
      cy.contains("she/her/hers").click({ force: true });
      cy.get("body").click(0, 0); // close dropdwon

      cy.contains(
        "How would you describe the economic situation in your household while you were growing up"
      )
        .next()
        .next()
        .next()
        .children()
        .first()
        .click();

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
      cy.get("body").click(0, 0); // close dropdwon

      cy.contains("What Age Classrooms are you interested in offering?")
        .next()
        .click();
      cy.contains("Infants").click({ force: true });
      cy.contains("Toddler").click({ force: true });
      cy.get("body").click(0, 0); // close dropdwon

      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 60000 }).should("include", "/welcome/add-profile-info");
    });
  });

  describe("add-profile-info", () => {
    beforeEach(() => {
      cy.visit("/welcome/add-profile-info", { responseTimeout: 60000 });
    });

    it("uploads a file", () => {
      cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as("upload");

      cy.fixture("test_profile_picture.jpg").then((filecontent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: filecontent.toString(),
          fileName: "test_profile_picture.jpg",
          mimeType: "image/jpg",
        });
      });
      // wait for upload to complete after 1 minute
      cy.wait("@upload", { requestTimeout: 60000 });

      cy.contains("Confirm").click();

      cy.url({ timeout: 60000 }).should("include", "/ssj");
    });
  });

  describe("inputting personal details", () => {
    beforeEach(() => {
      cy.visit("/welcome/existing-member/confirm-your-details");
    });

    it("should display form", () => {
      cy.get('input[name="firstName"]').should("be.visible");
      cy.get('input[name="lastName"]').should("be.visible");
      cy.get('input[name="city"]').should("be.visible");
      cy.contains("State").should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should be able to update fields", () => {
      cy.get('input[name="firstName"]').clear().type("newFirstName");
      cy.get('input[name="lastName"]').clear().type("newLastName");
      cy.get('input[name="city"]').clear().type("Brooklyn");
      cy.contains("State").next().click();
      cy.contains("New York").click();
      cy.get("body").click(0, 0); // close dropdwon
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 10000 }).should(
        "include",
        "/welcome/existing-member/confirm-demographic-info"
      );
    });
  });
  describe("existing member", () => {
    describe("confirming demographic info", () => {
      beforeEach(() => {
        cy.visit("/welcome/existing-member/confirm-demographic-info");
      });

      it("should display form", () => {
        cy.contains("language");
        cy.contains("ethnicity");
        cy.contains("LGBTQIA");
        cy.contains("gender identity");
        cy.contains("pronouns");
        cy.contains("economic situation in your household");
        cy.contains("Montessori Certified");
        cy.contains("What is your role at Wildflower Schools?");
      });

      it("should be able to update fields", () => {
        cy.contains("What is your primary language?").next().click();
        cy.contains("English").click();
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains("What is your ethnicity?").next().click();
        cy.contains("American Indian or Alaska Native").click({ force: true });
        cy.contains("Asian").click({ force: true });
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains("Do you identify as a member of the LGBTQIA community?")
          .get("label")
          .first()
          .click();

        cy.contains("What is your gender identity?").next().click();
        cy.contains("Male/Man").click({ force: true });
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains("What are your pronouns?").next().click();
        cy.contains("she/her/hers").click({ force: true });
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains(
          "How would you describe the economic situation in your household while you were growing up"
        )
          .next()
          .next()
          .next()
          .children()
          .first()
          .click();

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
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains("What is your role at Wildflower Schools?").next().click();
        cy.contains("Emerging Teacher Leader").click({ force: true });
        cy.contains("Foundation Partner").click({ force: true });
        cy.get("body").click(0, 0); // close dropdwon

        cy.get('button[type="submit"]').click();
        cy.url({ timeout: 60000 }).should(
          "include",
          "/welcome/existing-member/add-profile-info"
        );
      });
    });
  });
});
