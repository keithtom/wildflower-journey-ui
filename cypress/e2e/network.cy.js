describe("network", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });

  describe("foundation member browsing", () => {
    beforeEach(() => {
      cy.resetFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
    });

    describe("viewing results", () => {
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
  describe("foundation member and TL browsing and editing", () => {
    beforeEach(() => {
      cy.resetFixturesAndLogin();
      cy.visit("/network", { timeout: 60000 });
    });
    // Can view the /network page
    // Can see initialized people results on the /network page

    // Can search for themselves
    // Can see result for themselves

    // Can click the themself result
    // Can view the /[personId] page with their own profile on it

    // Can click “edit profile” button
    // Can edit a field in the modal
    // Can save the edit in the modal
    // Can see the edit on the /[personId] page

    // Can click to their school from the /[personId] page

    // Can view the [schoolId] page with their own school on it

    // Can see themselves in the leadership of the school

    // Can click “edit school profile” button
    // Can edit a field in the modal
    // Can save the edit in the modal
    // Can see the edit on the /[schoolId] page
  });
});
