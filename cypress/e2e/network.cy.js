import "cypress-file-upload";

describe("network", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });
  // --------------------- Wildflower Member
  describe("wildflower member", () => {
    beforeEach(() => {
      cy.resetNetworkFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
      cy.wait(5000);
    });

    // Continue
    describe("visiting network page", () => {
      it("should load the page", () => {
        cy.contains("Network");
      });
    });
    describe("viewing people results", () => {
      it("should return people results", () => {
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=people&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
      });
    });
    describe("filtering and searching people", () => {
      it("should allow searching", () => {
        cy.get('input[name="search"]').type("katelyn");
        cy.contains("Katelyn Shore");
      });
      it("should allow filtering", () => {
        cy.contains("Language").click();
        cy.contains("English").click({ force: true });
        cy.get("body").click(0, 0);
      });
    });
    describe("viewing school results", () => {
      it("should toggle to school category", () => {
        cy.contains("Schools").click();
      });
      it("should return school results", () => {
        cy.contains("Schools").click();
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=a&models=schools&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
      });
    });
    describe("filtering and searching schools", () => {
      it("should allow searching", () => {
        cy.contains("Schools").click();
        cy.get('input[name="search"]').type("wild rose");
        cy.contains("Wild Rose Montessori");
      });
      it("should allow filtering", () => {
        cy.contains("Schools").click();
        cy.wait(5000);
        cy.contains("State").click();
        cy.contains("Massachusetts").click({ force: true });
        cy.get("body").click(0, 0);
      });
    });
    describe("visiting school and person pages", () => {
      it("should allow clicking on school result and navigating to person profile from there", () => {
        cy.contains("Schools").click();
        cy.get('input[name="search"]').type("wild rose");
        cy.contains("Wild Rose Montessori").click();
        cy.contains("Wild Rose Montessori");
        cy.contains("Cambridge, MA");
        cy.contains("Katelyn Shore").click();
        cy.contains("Katelyn Shore");
      });
    });
  });
  // --------------------- Teacher Leader
  describe("Teacher leader", () => {
    beforeEach(() => {
      cy.resetNetworkFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
    });
    describe("visiting network page", () => {
      it("should load the page", () => {
        cy.contains("Network");
      });
    });
    describe("viewing people results", () => {
      it("should return people results", () => {
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=people&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
      });
    });
    describe("paginating results", () => {
      it("should load more results on scroll", () => {
        // Scroll to trigger the request
        cy.scrollTo(0, 2400);
        // Intercept the network request
        cy.intercept("GET", `${Cypress.env("apiUrl")}/v1/search**`).as(
          "getSearchResults"
        );
        // Wait for the network request to be made
        cy.wait("@getSearchResults").then((interception) => {
          // Assert that the request URL contains page=2
          expect(interception.request.url).to.include("page=2");
        });
      });
    });
    describe("search for self and navigate to profile", () => {
      it("should set people cookies, search themselves, and click to profile, and edit", () => {
        let firstName;
        cy.getCookie("firstName")
          .should("exist")
          .then((f) => {
            firstName = f.value;
          });
        let lastName;
        cy.getCookie("lastName")
          .should("exist")
          .then((l) => {
            lastName = l.value;
          });
        let id;
        cy.getCookie("id")
          .should("exist")
          .then((i) => {
            id = i.value;
          });
        cy.then(() => {
          // search for self
          cy.get('input[name="search"]').type(`${firstName} ${lastName}`);
          cy.contains(`${firstName} ${lastName}`);
          cy.contains(`${firstName} ${lastName}`).click();
          cy.contains(`${firstName} ${lastName}`);
          // edit profile
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
          cy.contains("What is your role at Wildflower Schools?")
            .next()
            .click();
          cy.contains("Foundation Partner").click({ force: true });
          cy.contains("Teacher Leader").click({ force: true });
          cy.get("body").click(0, 0); // close dropdwon
          cy.get('button[type="submit"]').should("not.be.disabled").click();

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
          cy.get('[data-cy="personId-edit-schoolHistory-remove"]').each(
            ($el) => {
              cy.wrap($el).click();
            }
          );
          cy.get('[data-cy="personId-edit-schoolHistory-empty"]');
          // add again (so we can navigate to it later)
          cy.get('[data-cy="personId-edit-schoolHistory-add"]').click();
          cy.get('[name="school"]').click();
          cy.get('[name="school"]').type("Wild Rose Montessori");
          cy.get('li[data-option-index="0"]')
            .contains("Wild Rose Montessori")
            .click();
          cy.get('[data-cy="personId-edit-schoolHistory-dateJoined"]')
            .clear()
            .type("01/01/2014");
          cy.get('[data-cy="personId-edit-schoolHistory-dateLeft"]').clear(); // clear date left so they are eligible to be a current school leader

          cy.get('[name="schoolTitle"]').click();
          cy.get('[name="schoolTitle"]').type("CFO");
          cy.get('button[type="submit"]').should("not.be.disabled").click();

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
          cy.get('[data-cy="personId-edit-boardHistory-remove"]').each(
            ($el) => {
              cy.wrap($el).click();
            }
          );
          cy.get('[data-cy="personId-edit-boardHistory-empty"]');

          // navigate to current school
          cy.get("body").click(0, 0);
          cy.contains("Wild Rose Montessori").click();
          // click edit school profile
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
          cy.get('input[placeholder="mm/dd/yyyy"]')
            .clear()
            .type(formattedToday);
          cy.get('[name="about"]').clear().type("New school about");

          cy.intercept("PUT", /(\/active_storage\/|amazonaws)/).as(
            "uploadLogo"
          );
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

          // edit enrollment
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

          // edit teacher leaders
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
          cy.get('[data-cy="schoolId-teacherLeaders-edit-0"]').click();
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
          //remove
          cy.get('[data-cy="personId-edit-schoolHistory-remove"]').each(
            ($el) => {
              cy.wrap($el).click();
            }
          );
        });
      });
    });
  });
});
