describe("Fibonacci", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled").contains("Рассчитать");
  });

  it("if there is a value in the input, then the add button is available", () => {
    cy.get("input").type("8");
    cy.get("button").should("not.be.disabled");
  });

  it("checking the calculation of the Fibonacci value", () => {
    cy.get("input").type("8");
    cy.get("button").contains("Рассчитать").click();
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle")
      .should("have.length", 9)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("1");
            break;
          case 1:
            cy.wrap($el).contains("1");
            break;
          case 2:
            cy.wrap($el).contains("2");
            break;
          case 3:
            cy.wrap($el).contains("3");
            break;
          case 4:
            cy.wrap($el).contains("5");
            break;
          case 5:
            cy.wrap($el).contains("8");
            break;
          case 6:
            cy.wrap($el).contains("13");
            break;
          case 7:
            cy.wrap($el).contains("21");
            break;
          case 8:
            cy.wrap($el).contains("34");
            break;
          default:
            return;
        }
      });
  });
});
