const { defineConfig } = require("cypress");

module.exports = {
  // The rest of the Cypress config options go here...
  projectId: "5gbubg",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
