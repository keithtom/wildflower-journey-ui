const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // The rest of the Cypress config options go here...
  projectId: "5gbubg",

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
