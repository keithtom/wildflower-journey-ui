const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  // The rest of the Cypress config options go here...
  projectId: "5gbubg",
  env: {
    apiUrl: process.env.API_URL,
  },
  "retries": 1,
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 50000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
