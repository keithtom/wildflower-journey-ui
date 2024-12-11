import "cypress-file-upload";

describe("network part 2", () => {
  let firstName;
  let lastName;
  let id;
  beforeEach(() => {
    cy.viewport(1280, 832);
  });
  // --------------------- Wildflower Member
  describe("wildflower member", () => {
    beforeEach(() => {
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

    // search for self and navigate to profile
    // edit
    // can edit general fields
    // can edit demographic fields
    // can edit certification and role fields
    // can edit school history fields
    // can edit board history fields
    // search for self and navigate to school profile
    // edit school profile

    describe("search for self and edit profile", () => {
      it("should search for self and navigate to profile", () => {
        // search for self
        cy.get('input[name="search"]').type(`${firstName} ${lastName}`);
        cy.contains(`${firstName} ${lastName}`);
        cy.contains(`${firstName} ${lastName}`).click();
        cy.contains(`${firstName} ${lastName}`);
        cy.contains(`${firstName} ${lastName}`).should("be.visible");
      });
      it("should edit profile general fields", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Edit profile").click();
        // edit general
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
      it("should edit profile demographic fields", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Edit profile").click();
        // edit demographic
        cy.get('[data-cy="personId-edit-demographic"]').click();
        cy.contains("What is your primary language?").next().click();
        cy.contains("English").click();
        cy.get("body").click(0, 0); // close dropdwon

        cy.contains("What is your ethnicity?").next().click();
        cy.contains("American Indian or Alaska Native").click({
          force: true,
        });
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
        cy.get('button[type="submit"]').should("not.be.disabled").click();
      });
      it("should edit certification and role fields", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Edit profile").click();
        // edit certification and role
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
        cy.get("body").click(0, 0); // close dropdwon
        cy.get('[name="montessoriCertifiedYear"]')
          .clear()
          .type("Primary, 2024");
        cy.contains("What is your role at Wildflower Schools?").next().click();
        cy.contains("Foundation Partner").click({ force: true });
        cy.contains("Teacher Leader").click({ force: true });
        cy.get("body").click(0, 0); // close dropdwon
        cy.get('button[type="submit"]').should("not.be.disabled").click();
      });
      it("should edit school history fields", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Edit profile").click();
        // edit school history
        cy.get('[data-cy="personId-edit-schoolHistory"]').click();
        // add
        cy.get('[data-cy="personId-edit-schoolHistory-add"]').click();
        cy.get('[name="school"]').click();
        cy.get('[name="school"]').type("Wild Rose Montessori");
        cy.get('li[data-option-index="0"]')
          .contains("Wild Rose Montessori")
          .click();
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
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Edit profile").click();
        // edit board history
        cy.get('[data-cy="personId-edit-boardHistory"]').click();
        // add
        cy.get('[data-cy="personId-edit-boardHistory-add"]').click();
        cy.get('[name="school"]').click();
        cy.get('[name="school"]').type("Wildflower Montessori");
        cy.get('li[data-option-index="0"]')
          .contains("Wildflower Montessori")
          .click();
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
        cy.get('[data-cy="personId-edit-boardHistory-empty"]');
      });
    });
    describe("navigate to school profile and edit", () => {
      it("should search for self and navigate to school profile", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Cypress Test School").click();
        cy.contains("Cypress Test School").should("be.visible");
        cy.get('[data-cy="schoolId-edit-school-profile"]').click();
      });
      it("should edit school general fields ", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Cypress Test School").click();
        cy.contains("Cypress Test School").should("be.visible");
        cy.get('[data-cy="schoolId-edit-school-profile"]').click();
        // edit general
        cy.get('input[name="city"]').clear().type("Brooklyn");
        cy.contains("State").next().click();
        cy.contains("New York").click({ force: true });
        cy.get("body").click(0, 0);
        cy.get('[data-cy="schoolId-open-date"]').click();
        const today = new Date();
        const yyyy = today.getFullYear() + 1;
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formattedToday = mm + "/" + dd + "/" + yyyy;
        cy.get('input[placeholder="mm/dd/yyyy"]').clear().type(formattedToday);
        cy.get('[name="about"]').clear().type("New school about");
        cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as("uploadLogo");
        cy.fixture("test_profile_picture.jpg").then((filecontent) => {
          cy.get('[name="schoolLogo"]').attachFile({
            fileContent: filecontent.toString(),
            fileName: "test_profile_picture.jpg",
            mimeType: "image/jpg",
          });
        });
        cy.wait("@uploadLogo", { requestTimeout: 60000 });

        cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as(
          "uploadBanner"
        );
        cy.fixture("test_profile_picture.jpg").then((filecontent) => {
          cy.get('[name="bannerImage"]').attachFile({
            fileContent: filecontent.toString(),
            fileName: "test_profile_picture.jpg",
            mimeType: "image/jpg",
          });
        });
        cy.wait("@uploadBanner", { requestTimeout: 60000 });
        cy.get('button[type="submit"]').should("not.be.disabled").click();
      });
      it("should edit school enrollment fields ", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Cypress Test School").click();
        cy.contains("Cypress Test School").should("be.visible");
        cy.get('[data-cy="schoolId-edit-school-profile"]').click();
        //  edit enrollment
        cy.get('[data-cy="schoolId-enrollment"]').click();
        cy.contains("Ages served").next().click();
        cy.contains("Infants").click({ force: true });
        cy.contains("Toddlers").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Governance type").next().click();
        cy.contains("Independent").click({ force: true });
        cy.get("body").click(0, 0);
        cy.get('input[name="maxEnrollment"]').clear().type("30");
        cy.get('input[name="numClassrooms"]').clear().type("4");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
      });
      it("should edit school history fields ", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Cypress Test School").click();
        cy.contains("Cypress Test School").should("be.visible");
        cy.get('[data-cy="schoolId-edit-school-profile"]').click();
        // edit teacher leader fields
        cy.get('[data-cy="schoolId-teacherLeaders"]').click();
        //add - existing
        cy.get('[data-cy="schoolId-teacherLeaders-add"]').click();
        cy.get('[name="teacher"]').click();
        cy.get('[name="teacher"]').type("Taylor Zanke");
        cy.get('li[data-option-index="0"]').contains("Taylor Zanke").click();
        cy.get('[data-cy="schoolId-teacherLeaders-dateJoined"]')
          .clear()
          .type("01/01/2014");
        cy.get('[data-cy="schoolId-teacherLeaders-dateLeft"]')
          .clear()
          .type("01/01/2024");
        cy.get('[name="schoolTitle"]').click();
        cy.get('[name="schoolTitle"]').type("CFO");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
        // edit
        cy.get('[data-cy="schoolId-teacherLeaders-edit-0"]').click();
        cy.get('[data-cy="schoolId-teacherLeaders-dateJoined"]')
          .clear()
          .type("01/02/2014");
        cy.get('[data-cy="schoolId-teacherLeaders-dateLeft"]')
          .clear()
          .type("01/01/2024");
        cy.get('[name="schoolTitle"]').click();
        cy.get('[name="schoolTitle"]').clear().type("CEO");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
        //add - invite
        cy.get('[data-cy="schoolId-teacherLeaders-add"]').click();
        cy.get('[data-cy="schoolId-teacherLeaders-add-invite"]').click();
        cy.get('[name="partnerFirstName"]').click();
        cy.get('[name="partnerFirstName"]').type("First Name");
        cy.get('[name="partnerLastName"]').click();
        cy.get('[name="partnerLastName"]').type("Last Name");
        cy.get('[name="partnerEmail"]').click();
        cy.get('[name="partnerEmail"]').type("firstNameLastName@test.com");
        cy.get('[name="schoolTitle"]').click();
        cy.get('[name="schoolTitle"]').type("CEO");
        cy.get('[data-cy="schoolId-teacherLeaders-add-invite-dateJoined"]')
          .clear()
          .type("01/01/2014");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
        //remove
        cy.get('[data-cy="schoolId-teacherLeaders-remove-0"]').click();
        // remove - Taylor Zanke
        cy.contains("Taylor Zanke")
          .parents('[data-cy="schoolId-teacherLeaders-list-item"]')
          .find('[data-cy-another="schoolId-teacherLeaders-remove"]')
          .click();
      });
      it("should edit board member fields ", () => {
        cy.visit(`/network/people/${id}`, { timeout: 60000 });
        cy.contains("Cypress Test School").click();
        cy.contains("Cypress Test School").should("be.visible");
        cy.get('[data-cy="schoolId-edit-school-profile"]').click();
        // edit board members
        cy.get('[data-cy="schoolId-boardMembers"]').click();
        //add
        cy.get('[data-cy="schoolId-boardMembers-add"]').click();
        cy.get('[name="teacher"]').click();
        cy.get('[name="teacher"]').type("Cameron Rutherford");
        cy.get('li[data-option-index="0"]')
          .contains("Cameron Rutherford")
          .click();
        cy.get('[data-cy="schoolId-boardMembers-dateJoined"]')
          .clear()
          .type("01/01/2014");
        cy.get('[data-cy="schoolId-boardMembers-dateLeft"]')
          .clear()
          .type("01/01/2024");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
        //edit
        cy.get('[data-cy="schoolId-boardMembers-edit-0"]').click();
        cy.get('[data-cy="schoolId-boardMembers-dateJoined"]')
          .clear()
          .type("01/02/2014");
        cy.get('[data-cy="schoolId-boardMembers-dateLeft"]')
          .clear()
          .type("01/01/2024");
        cy.get('button[type="submit"]').should("not.be.disabled").click();
        // remove
        cy.get('[data-cy-another="schoolId-boardMembers-remove"]').each(
          ($el) => {
            cy.wrap($el).click();
          }
        );
      });
    });
  });
});
