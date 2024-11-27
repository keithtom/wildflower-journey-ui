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
  });
});
