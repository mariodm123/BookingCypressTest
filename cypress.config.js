const { defineConfig } = require("cypress")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify").default
const specs = 'cypress/e2e/features/**/*.feature'

async function setupNodeEvents(on, config) {
    await preprocessor.addCucumberPreprocessorPlugin(on, config)
    on("file:preprocessor", browserify(config))
    return config
}
module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1280,
  defaultCommandTimeout: 10000,
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://mggp.pythonanywhere.com/',
    setupNodeEvents,
    specPattern: specs,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
  }
})

