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

    cy.visit('http://localhost:3000/login')
    // go to register

    cy.wait(1000)

    const email = 't@t.com'
    const password = "P@$$w0rd"

    cy.get("input#basic_email").type(email)
    cy.get("input#basic_password").type(password)

    cy.wait(1000)

    cy.get("button[type='submit']").click({ force: true })

    cy.url().should('not.contain', 'login')
  })
})

// Prevent TypeScript from reading file as legacy script
export { }