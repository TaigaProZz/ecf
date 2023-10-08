const { defineConfig } = require("cypress");

module.exports = defineConfig({
  port: 8888,
  viewportHeight: 700,
  viewportWidth: 1000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return config;
    },
    supportFile: "cypress/support/index.js",
    scrollBehavior: false
  }
});