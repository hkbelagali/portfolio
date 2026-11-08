describe('Academic website', () => {
  it('shows the introduction and navigates to research', () => {
    cy.visit('/')
    cy.contains('h1', "Hi, I'm Hrishi!")
    cy.get('header time').should('have.attr', 'datetime')
    cy.get('nav a[href="#research"]').click()
    cy.location('hash').should('eq', '#research')
    cy.get('#research h2').should('be.visible').and('contain', 'Research')
    cy.get('#research video').should('have.attr', 'autoplay')
    cy.get('#about .social-links a').should('have.length', 5)
  })
})
