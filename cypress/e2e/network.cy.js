import "cypress-file-upload";

describe("network", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });

  describe("network user browsing", () => {
    beforeEach(() => {
      cy.resetNetworkFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
    });
    describe("viewing results, filtering, and viewing profile pages", () => {
      it("should return people results", () => {
        // Can view the /network page
        cy.contains("Network");
        // Can see initialized people results on the /network page
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=people&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
        // Can search for a person
        cy.get('input[name="search"]').type("katelyn");
        // Can see results for a searched person
        cy.contains("Katelyn Shore");
        // Can filter results
        cy.contains("Language").click();
        cy.contains("English").click({ force: true });
        cy.get("body").click(0, 0);
        // Can see filtered results for a searched person
        cy.contains("Katelyn Shore");
        // Can clear the search input
        cy.get('input[name="search"]').clear();
        // Can toggle to search for schools
        cy.contains("Schools").click();
        // Can see the initialized school results on the /network page
        cy.request({
          method: "GET",

          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=schools&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
        // Can search for a school
        cy.get('input[name="search"]').type("wild rose");
        // Can see results for a searched school
        cy.contains("Wild Rose Montessori");
        // Can filter results
        cy.contains("State").click();
        cy.contains("Massachusetts").click({ force: true });
        cy.get("body").click(0, 0);
        // Can see filtered results for a searched school
        cy.contains("Wild Rose Montessori");
        // Can click on a school result
        cy.contains("Wild Rose Montessori").click();
        // Can view the /[schoolId] page
        cy.contains("Wild Rose Montessori");
        cy.contains("Cambridge, MA");
        // Can click a school leader on the /[schoolId] page
        cy.contains("Katelyn").click();
        // Can view the /[personId] page
        cy.contains("Katelyn Shore");
      });
    });
  });

  describe("network user with TL role browsing and editing", () => {
    beforeEach(() => {
      cy.resetNetworkFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
    });
    describe("viewing results, searching for self, editing profile", () => {
      it("should return people results", () => {
        // Can view the /network page
        cy.contains("Network");
        // Can see initialized people results on the /network page
        cy.request({
          method: "GET",
          url: `${Cypress.env(
            "apiUrl"
          )}/v1/search?q=*&models=people&page=1&per_page=11`,
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.greaterThan(0);
        });
        // Can scroll and load more results
        cy.scrollTo(0, 2400);
        // Can search for themselves
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
        //Wait for cookies to be set, then type name into search
        cy.then(() => {
          cy.get('input[name="search"]').type(`${firstName} ${lastName}`);
          // Can see result for themselves
          cy.contains(`${firstName} ${lastName}`);
          // Can click the themself result
          cy.contains(`${firstName} ${lastName}`).click();
          // Can view the /[personId] page with their own profile on it
          cy.contains(`${firstName} ${lastName}`);
          // Can click “edit profile” button
          cy.contains("Edit profile").click();
          cy.get('input[name="firstName"]').clear().type("newFirstName");
          cy.get('input[name="lastName"]').clear().type("newLastName");
          cy.get('input[name="city"]').clear().type("Brooklyn");
          cy.get('input[name="state"]').clear().type("New York");
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
          // wait for upload to complete after 1 minute
          cy.wait("@upload", { requestTimeout: 60000 });

          cy.get('button[type="submit"]').should("not.be.disabled").click();
        });
      });
    });

    // Can click to their school from the /[personId] page

    // Can view the [schoolId] page with their own school on it

    // Can see themselves in the leadership of the school

    // Can click “edit school profile” button
    // Can edit a field in the modal
    // Can save the edit in the modal
    // Can see the edit on the /[schoolId] page
  });
});
