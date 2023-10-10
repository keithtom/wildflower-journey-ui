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
      it("should show results for search and filter", () => {
        cy.contains("Katelyn Shore");
      });
    });
    describe("viewing school results", () => {
      it("should toggle to school category", () => {
        cy.contains("Schools").click();
      });
      it("should return school results", () => {
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=schools&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
      });
    });
    describe("filtering and searching people", () => {
      it("should allow searching", () => {
        cy.get('input[name="search"]').type("wild rose");
        cy.contains("Wild Rose Montessori");
      });
      it("should allow filtering", () => {
        cy.contains("State").click();
        cy.contains("Massachusetts").click({ force: true });
        cy.get("body").click(0, 0);
      });
      it("should show results for search and filter", () => {
        cy.contains("Wild Rose Montessori");
      });
    });
    describe("visiting school and person pages", () => {
      it("should allow clicking on school result", () => {
        cy.contains("Wild Rose Montessori").click();
      });
      it("should show the school page", () => {
        cy.contains("Wild Rose Montessori");
        cy.contains("Cambridge, MA");
      });
      it("should permit clicking on a school leader", () => {
        cy.contains("Katelyn").click();
      });
      it("should show the person page", () => {
        cy.contains("Katelyn Shore");
      });
    });
  });
  // --------------------- Teacher Leader
  describe.only("Teacher leader", () => {
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
        cy.scrollTo(0, 2400);
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
          cy.get('input[name="search"]').type(`${firstName} ${lastName}`);
          cy.contains(`${firstName} ${lastName}`);
          cy.contains(`${firstName} ${lastName}`).click();
          cy.contains(`${firstName} ${lastName}`);
          cy.contains("Edit profile").click();
          cy.get('input[name="firstName"]').clear().type("newFirstName");
          cy.get('input[name="lastName"]').clear().type("newLastName");
          cy.get('input[name="city"]').clear().type("Brooklyn");

          cy.contains("State").next().click();
          cy.contains("New York").click();
          cy.get("body").click(0, 0);

          cy.get('input[name="email"]').clear().type(`newEmail${id}@email.com`);
          cy.get('input[name="phone"]').clear().type("(123) 456 7890");
          cy.get('[name="about"]').clear().type("New about me bio");

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

          cy.contains("What is your role at Wildflower Schools?")
            .next()
            .click();
          cy.contains("Emerging Teacher Leader").click({ force: true });
          cy.contains("Foundation Partner").click({ force: true });
          cy.get("body").click(0, 0); // close dropdwon

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

          cy.contains("Cypress Test School").click();
          cy.contains("Edit school profile").click();
          cy.get('input[name="city"]').clear().type("Brooklyn");

          cy.contains("State").next().click();
          cy.contains("New York").click();
          cy.get("body").click(0, 0);

          cy.contains("open date", {
            matchCase: false,
            timeout: 60000,
          }).click();
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

          cy.contains("Ages served").next().click();
          cy.contains("Infants").click({ force: true });
          cy.contains("Toddlers").click({ force: true });
          cy.get("body").click(0, 0); // close dropdwon

          cy.contains("Governance type").next().click();
          cy.contains("Independent").click();
          cy.get("body").click(0, 0);

          cy.get('input[name="maxEnrollment"]').clear().type("30");

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
        });
      });
    });
  });
});
