# Tests

Integration tests use [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress) tool and are located in the `../cypress` directory. Currently, we have end to end (E2E) tests for the following flows:
1. Logging in
2. Onboarding as a new user
3. Assigning, completing tasks
4. Navigating through the dashboard

When code is pushed to github, integration tests are automatically run using github actions, defined in `cypress.yml`. These tests are run on ubuntu servers and makes API requests to the dev server. Test results and artifacts can be viewed on [Cloud Cypress](https://cloud.cypress.io/).

## Running tests locally
`yarn run cypress open`


## Resetting Database Between Tests
Before most tests, a request is made to the API to create a new user and delete stale test users. This before hook is defined in `../cypress/support/commands.js` file and called in each test file. Note that there are two functions that reset fixtures `resetFixtures` and `resetPartnerFixtures`. 

## Gotchas
1. The cypress config file (`cypress.config.js`) has access to the `.env` file but not the `.env.local` file. 