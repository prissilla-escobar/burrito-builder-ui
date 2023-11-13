describe("home page user flow", () => {
  
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders',
    }).as('ordersStub')
    cy.visit('http://localhost:3000/')
  })
  
  it("should show title, form inputs, order, submit and current card orders", () => {
    cy.wait('@ordersStub')
    cy.get('h1').should('have.text', 'Burrito Builder')

    cy.get('form').should('exist')
      .get('[placeholder="Name"]').should('have.attr', 'name')
    cy.buttonSearch('beans')
    cy.buttonSearch('steak')
    cy.buttonSearch('carnitas')
    cy.buttonSearch('sofritas')
    cy.buttonSearch('lettuce')
    cy.buttonSearch('queso fresco')
    cy.buttonSearch('pico de gallo')
    cy.buttonSearch('hot sauce')
    cy.buttonSearch('guacamole')
    cy.buttonSearch('jalapenos')
    cy.buttonSearch('cilantro')
    cy.buttonSearch('sour cream')

    cy.get('form p').should('have.text', 'Order: Nothing selected')

    cy.get('form .submit-button').should('have.text', 'Submit Order')

    cy.get('.order-card-container').should('exist').children()
      .should('have.length', 3)

    cy.orderCardCheck(0, {
      name: 'Alex',
      numberIng: 5,
      ingNoSpacesExceptWordsWithSpace: 'sofritasbeanssour creamcarnitasqueso fresco'
    })

    cy.orderCardCheck(1, {
      name: 'Prissilla Escobar',
      numberIng: 4,
      ingNoSpacesExceptWordsWithSpace:'beanscarnitassofritascilantro'
    })

    cy.orderCardCheck(2, {
      name: 'Sloth',
      numberIng: 5,
      ingNoSpacesExceptWordsWithSpace:'carnitasqueso frescosour creamcilantrobeans'
    })
  })

  it('should fill out form and have order display on DOM and in backend API', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {
        name: 'Ragnar',
        ingredients: ['beans', 'sofritas', 'lettuce', 'guacamole']
      }
    }).as('postOrder')

    cy.get('input[name="name"]').type('Ragnar').should('have.value', 'Ragnar')
    cy.get('[name="beans"]').click()
      .get('form p').should('have.text', 'Order: beans')
    cy.get('[name="sofritas"]').click()
     .get('form p').should('have.text', 'Order: beans, sofritas')
    cy.get('[name="lettuce"]').click()
      .get('form p').should('have.text', 'Order: beans, sofritas, lettuce')
    cy.get('[name="guacamole"]').click()
      .get('form p').should('have.text', 'Order: beans, sofritas, lettuce, guacamole')

    cy.get('.submit-button').click()
    cy.wait('@postOrder')
    cy.wait('@ordersStub')

    cy.get('.order-card-container').should('exist').children()
      .should('have.length', 4)

    cy.orderCardCheck(3, {
      name: 'Ragnar',
      numberIng: 4,
      ingNoSpacesExceptWordsWithSpace:'beanssofritaslettuceguacamole'
    })
  })

  it('should not submit an order without a name or ingredient', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders')
    
    cy.get('.submit-button').click()

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You need to enter a name and select at least one ingredient in order to submit an order. Thank you!')
    })
    
    cy.get('.order-card-container').should('exist').children()
      .should('have.length', 3)
  })

  it('should not submit an order with only ingredients selected', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders')
    
    cy.get('[name="sofritas"]').click()
    cy.get('[name="guacamole"]').click()
    cy.get('.submit-button').click()

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You need to enter a name and select at least one ingredient in order to submit an order. Thank you!')
    })
    cy.get('.order-card-container').should('exist').children()
      .should('have.length', 3)
  })

  it('should not submit an order with only name selected', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders')
    
    cy.get('input[name="name"]').type('Lex Greyson').should('have.value', 'Lex Greyson')
    cy.get('.submit-button').click()

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You need to enter a name and select at least one ingredient in order to submit an order. Thank you!')
    })
    cy.get('.order-card-container').should('exist').children()
      .should('have.length', 3)
  })
})
