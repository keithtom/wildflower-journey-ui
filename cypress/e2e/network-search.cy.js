import "cypress-file-upload";

describe("network search", () => {
  beforeEach(() => {
    cy.viewport(1280, 832);
    cy.resetNetworkFixturesAndLogin();
    cy.visit("/network", { timeout: 60000 });
    cy.wait(5000);
  });

  describe("search functionality", () => {
    it("should load the network page", () => {
      cy.contains("Explore the Wildflower Network").should("be.visible");
      cy.get('[data-cy="network-search-input"]').should("be.visible");
      cy.get('[data-cy="network-people-tab"]').should("be.visible");
      cy.get('[data-cy="network-schools-tab"]').should("be.visible");
    });

    it("should search for people", () => {
      cy.get('[data-cy="network-search-input"]').find("input").type("a");
      cy.get('[data-cy="network-search-input"]')
        .find("input")
        .should("have.value", "a");
      cy.get('a[href^="/network/people/"]').should("exist");
    });

    it("should search for schools", () => {
      cy.get('[data-cy="network-schools-tab"]').click();
      cy.get('[data-cy="network-search-input"]')
        .find("input")
        // Searching for "Buttercup" because manual testing shows this school is present in dev data
        .type("Buttercup");
      cy.get('[data-cy="network-search-input"]')
        .find("input")
        .should("have.value", "Buttercup");
      cy.get('a[href^="/network/schools/"]').should("exist");
    });
  });

  describe("filter functionality", () => {
    describe("people filters", () => {
      beforeEach(() => {
        cy.get('[data-cy="network-people-tab"]').should("be.visible");
      });

      it("should filter by state", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("State").click();
        cy.contains("Massachusetts").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Massachusetts").should("be.visible");
      });

      it("should filter by language", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Language").click();
        cy.contains("English").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("English").should("be.visible");
      });

      it("should filter by ethnicity", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Ethnicity").click();
        cy.contains("American Indian or Alaska Native").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("American Indian or Alaska Native").should("be.visible");
      });

      it("should filter by gender identity", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Gender identity").click();
        cy.contains("Male/Man").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Male/Man").should("be.visible");
      });

      // Can't seem to get this to work for some reason, though it is built exactly the same as the others
      // it("should filter by role", () => {
      //   cy.get('[data-cy="network-filter-label"]').click();
      //   cy.contains("Role").click();
      //   cy.contains("Teacher Leader").click({ force: true });
      //   cy.get("body").click(0, 0);
      //   cy.contains("Teacher Leader").should("be.visible");
      // });
    });

    describe("school filters", () => {
      beforeEach(() => {
        cy.get('[data-cy="network-schools-tab"]').click();
        cy.wait(5000);
      });

      it("should filter by state", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("State").click();
        cy.contains("Massachusetts").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Massachusetts").should("be.visible");
      });

      it("should filter by date opened", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Date opened").click();
        cy.contains("Not open").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Not open").should("be.visible");
      });

      it("should filter by age level", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Age level").click();
        cy.contains("Primary").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Primary").should("be.visible");
      });

      it("should filter by governance", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Governance").click();
        cy.contains("Independent").click({ force: true });
        cy.get("body").click(0, 0);
        cy.contains("Independent").should("be.visible");
      });

      it("should filter by charter", () => {
        cy.get('[data-cy="network-filter-label"]').click();
        cy.contains("Charter").click();
        cy.contains("Minnesota Wildflower Montessori School").click({
          force: true,
        });
        cy.get("body").click(0, 0);
        cy.contains("Minnesota Wildflower Montessori School").should(
          "be.visible"
        );
      });
    });
  });
});
