describe("dashboard spec", () => {
  beforeEach(() => {
    cy.resetFixturesAndLogin();
    cy.visit("/ssj", { timeout: 60000 });
  });

  it("should display dashboard", () => {
    cy.contains("Ways to work together");
  });

  describe("update anticipated open date", () => {
    it("should update anticipated open date", () => {
      cy.contains("open date", { matchCase: false, timeout: 60000 }).click();
      const today = new Date();
      const yyyy = today.getFullYear() + 1;
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedToday = mm + "/" + dd + "/" + yyyy;

      cy.intercept({
        method: "PUT",
        url: "/v1/ssj/teams/*",
      }).as("teamUpdate");

      cy.get('input[placeholder="mm/dd/yyyy"]').clear().type(formattedToday);
      cy.contains("Set an anticipated open date").click();

      cy.contains("OPEN DATE").next().should("contain", yyyy);

      cy.wait("@teamUpdate").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
  });

  describe("inviting partner", () => {
    it("should send invite to partner", () => {
      cy.intercept({
        method: "PUT",
        url: "/v1/ssj/teams/*/invite_partner",
      }).as("invitePartner");

      const today = new Date();
      const datestamp = today.toISOString().split("T")[0];
      const email = "newemail_partner_" + datestamp + "@test.com";

      cy.contains("Add a partner", { timeout: 60000 }).click();
      cy.get('input[name="partnerFirstName"]').clear().type("Donna");
      cy.get('input[name="partnerLastName"]').clear().type("Pascal");
      cy.get('input[name="partnerEmail"]').clear().type(email);
      cy.get('button[type="submit"]').click();
      cy.contains("Thanks for making a request to add a partner!", {
        timeout: 30000,
      });
      cy.get("body").click(0, 0); // close pop up

      cy.wait("@invitePartner").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
  });
});
