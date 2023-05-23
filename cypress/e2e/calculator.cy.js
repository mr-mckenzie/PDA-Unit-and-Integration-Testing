describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click()
    cy.get('.display').should('contain', '2')
  })

  it('should update the display of the running total when pressing the number buttons', () => {
    cy.get('#number8').click()
    cy.get('#number7').click()
    cy.get('#number4').click()
    cy.get('#number1').click()
    cy.get('#running-total').should('contain', '8741')
  })

  it('should have the arithmetical operations update the display with the result of the operation', () => {
    cy.get('#number2').click()
    cy.get('#operator-multiply').click()
    cy.get('#number6').click()
    cy.get('#operator-divide').click()
    cy.get('#number3').click()
    cy.get('#operator-subtract').click()
    cy.get('.display').should('contain', '4')   
  })

  it('should allow multiple operations to be chained together', () => {
    cy.get('#number3').click()
    cy.get('#operator_add').click()
    cy.get('#number1').click()
    cy.get('#operator-subtract').click()
    cy.get('#number2').click()
    cy.get('#operator-equals').click()
    cy.get('.display').should('contain', '2')    
  })

  it('should output the expected results for positive numbers (225,000)', () => {
    cy.get('#number3').click()
    cy.get('#number0').click()
    cy.get('#number0').click()
    cy.get('#operator-multiply').click()
    cy.get('#number7').click()
    cy.get('#number5').click()
    cy.get('#number0').click()
    cy.get('#operator-equals').click()
    cy.get('.display').should('contain', '225000')  
  })

  it('should output the expected results for negative numbers (-800)', () => {
    cy.get('#number1').click()
    cy.get('#operator-subtract').click()
    cy.get('#number4').click()
    cy.get('#number0').click()
    cy.get('#number1').click()
    cy.get('#operator-multiply').click()
    cy.get('#number2').click()
    cy.get('#operator-equals').click()
    cy.get('.display').should('contain', '-800')  
  })

  it('should output the expected results for decimal numbers (2.875)', () => {
    cy.get('#number1').click()
    cy.get('#decimal').click()
    cy.get('#number2').click()
    cy.get('#number5').click()
    cy.get('#operator-multiply').click()
    cy.get('#number2').click()
    cy.get('#decimal').click()
    cy.get('#number3').click()   
    cy.get('#operator-equals').click()
    cy.get('.display').should('contain', '2.875')  
  })

  it('should output the expected results for very large numbers (860,000,000)', () => {
    cy.get('#number2').click()
    cy.get('#number0').click()
    cy.get('#number0').click()
    cy.get('#number0').click()
    cy.get('#number0').click()

    cy.get('#operator-multiply').click()

    cy.get('#number4').click()
    cy.get('#number3').click()
    cy.get('#number0').click()
    cy.get('#number0').click()
    cy.get('#number0').click()

    cy.get('#operator-multiply').click()
    cy.get('#number4').click()
    
    cy.get('#operator-equals').click()
    cy.get('#running-total').should('contain', '3440000000')  
  })


  it('should not carry out a calculation if you divide by zero', () => {
    cy.get('#number4').click()
    cy.get('#operator-divide').click()
    cy.get('#number0').click()
    cy.get('#operator-equals').click()
    cy.get('#running-total').should('contain', '4')  
  })

})