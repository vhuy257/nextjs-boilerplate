describe('Navigation', () => {
    it('open login form and fill email password', () => {
        cy.visit('http://localhost:4000/')

        cy.get('.login-dropdown').click()

        cy.get('input[name="email"]').type("sabin@adams.com")

        cy.get('input[name="password"]').type("password-sabin")
        
        cy.get('button[type="submit"]').click()
    })
})