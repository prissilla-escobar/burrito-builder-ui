Cypress.Commands.add('buttonSearch', (ingredient) => {
    cy.get(`[name="${ingredient}"]`).should('have.text', ingredient)
})

Cypress.Commands.add('orderCardCheck', (index, {name, numberIng, ingNoSpacesExceptWordsWithSpace}) => {
    cy.get('.order-card-container .order')
      .eq(index).should('exist').as('orderCard')
      

      cy.get('@orderCard')
        .within(() => {
            cy.get('@orderCard')
            .get('h3').should('have.text', name)
            .get('.ingredient-list li')
            .should('have.length', numberIng)
            .get('.ingredient-list').should('have.text', ingNoSpacesExceptWordsWithSpace)
        })
})
