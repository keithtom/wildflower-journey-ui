describe("admin spec", () => {
  describe("viewing the admin dashboard", () => {
    beforeEach(() => {
      cy.login("test@test.com", "password");
      cy.visit("/network");
    });
    it("should display admin link in user menu and redirect", () => {
      cy.get("div#headerAvatarIcon").click();
      cy.contains("Admin");
    });
  });
  describe("adding a school", () => {
    beforeEach(() => {
      cy.login("test@test.com", "password");
      cy.visit("/admin/schools");
    });
    it("should be able to add a school", () => {
      //open modal
      cy.contains("Add").click();
      //add a teacher, firstname, lastname, email
      cy.get('input[name="first_name"]').clear().type("newFirstName");
      cy.get('input[name="last_name"]').clear().type("newLastName");
      cy.get('input[name="email"]')
        .clear()
        .type(`newEmail${new Date().valueOf()}@email.com`);
      cy.get("button.MuiButtonBase-root").contains("Add ETL").click();
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
      cy.get("button.MuiButtonBase-root").contains("Invite").click();
    });
  });
});
