/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress
import { faker } from '@faker-js/faker';

// Cypress E2E Test
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // open language select
    cy.get("button[data-role='language-select']").first().click()
    // Find a link with an href attribute containing "about" and click it

    // select eng
    cy.wait(500)

    cy.get("button[data-role='language-variant']").first().click()

    // go to register
    cy.get("button[data-role='register-button']").first().click()
    // The new url should include "/about"
    // cy.url().should('include', '/app')
    cy.wait(1000)

    cy.get("div.ant-card-body").get("button[data-role='confirm']").first().click()

    const email = faker.internet.email()
    const password = "P@$$w0rd"

    cy.get("input#basic_email").type(email)
    cy.get("input#basic_Verification").type("1234")

    cy.get("a[data-role='send-verification']").first().click()
    cy.get("input#basic_password").type(password)
    cy.get("input#basic_confirm").type(password)

    cy.get("input#basic_check").first().click()

    // cy.get("button[type='submit']").first().click()

    // The new page should contain an h1 with "About page"
    // cy.get('h1').contains('About Page')
    // cy.get('h2').contains('TestNet Readme')

    // cy.get("#testnet-notification-dialog").get("button").click()
  })
})

// Prevent TypeScript from reading file as legacy script
export { }