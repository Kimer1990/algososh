import {
  CIRCLE_CHANGING,
  CIRCLE_MODIFIED,
} from "../../src/constants/circle-color";

describe("String", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled").contains("Развернуть");
  });

  it("if there is a value in the input, then the add button is available", () => {
    cy.get("input").type("dream");
    cy.get("button").should("not.be.disabled");
  });

  it("string reversal check", () => {
    cy.clock();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get("input").type("12345").should("have.value", "12345");
    cy.get("button").contains("Развернуть").click();
    cy.get("[class*=circle_circle]").as("circle");

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("1");
            break;
          case 1:
            cy.wrap($el).contains("2");
            break;
          case 2:
            cy.wrap($el).contains("3");
            break;
          case 3:
            cy.wrap($el).contains("4");
            break;
          case 4:
            cy.wrap($el).contains("5");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("1");
          break;
        case 4:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("5");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("5");
          break;
        case 1:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("2");
          break;
        case 3:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("4");
          break;
        case 4:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("1");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle").each(($el, index) => {
      switch (index) {
        case 1:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("4");
          break;
        case 2:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("3");
          break;
        case 3:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("2");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle").each(($el, index) => {
      switch (index) {
        case 2:
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("3");
          break;
        default:
          return;
      }
    });

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("5");
            break;
          case 1:
            cy.wrap($el).contains("4");
            break;
          case 2:
            cy.wrap($el).contains("3");
            break;
          case 3:
            cy.wrap($el).contains("2");
            break;
          case 4:
            cy.wrap($el).contains("1");
            break;
          default:
            return;
        }
      });
  });
});
