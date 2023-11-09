describe("admin spec", () => {
  beforeEach(() => {
    cy.resetFixturesAndLogin();
    cy.visit("/ssj", { timeout: 60000 });
  });

  describe("viewing the admin dashboard", () => {
    it("should display admin link in user menu and redirect", () => {
      cy.get("div#headerAvatarIcon").click();
      cy.contains("Admin").click();
      cy.contains("Admin");
    });
  });
  describe("adding a school", () => {
    beforeEach(() => {
      cy.visit("/admin/ssj");
      cy.wait(1500);
    });
    it("should be able to add a school", () => {
      //open modal
      cy.contains("Add").click();
      //add a teacher, firstname, lastname, email
      cy.get('input[name="firstName"]').clear().type("newFirstName");
      cy.get('input[name="lastName"]').clear().type("newLastName");
      cy.get('input[name="email"]')
        .clear()
        .type(`newEmail${new Date().valueOf()}@email.com`);
      cy.contains("Add ETL").click();
      //click to next step
      cy.contains("Next").click();
      //add an ops guide
      cy.contains("Maya Soriano").click();
      //click to next step
      cy.contains("Next").click();
      //add a rgl
      cy.contains("Maia Blankenship").click();
      //click to next step
      cy.contains("Next").click();
      //view summary
      cy.contains("newFirstName newLastName");
      cy.contains("Maya Soriano");
      cy.contains("Maia Blankenship");
      //submit
      cy.contains("Invite").click();
    });
  });
});
