describe("network", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
  });

  describe("foundation member browsing", () => {
    beforeEach(() => {
      cy.visit("/network", { timeout: 60000 });
    });

    describe("viewing results", () => {
      it("should return people results", () => {
        // Can view the /network page
        cy.contains("Network");
        // Can see initialized people results on the /network page
        cy.get(".MuiCard-root").should("have.length" > 1);
      });
    });

    // Can search for a person
    // Can see results for a searched person

    // Can filter results
    // Can see filtered results for a searched person

    // Can clear the search input

    // Can toggle to search for schools
    // Can see the initialized school results on the /network page

    // Can search for a school
    // Can see results for a searched school

    // Can filter results
    // Can see filtered results for a searched school

    // Can click on a school result

    // Can view the /[schoolId] page

    // Can click a school leader on the /[schoolId] page

    // Can view the /[personId] page
  });
});
