import {
  CIRCLE_CHANGING,
  CIRCLE_DEFAULT,
} from "../../src/constants/circle-color";

describe("Stack", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.disabled").contains("Удалить");
    cy.get("button").should("be.disabled").contains("Очистить");
  });

  it("check for adding and removing an element to the stack", () => {
    cy.clock();

    cy.get("input").type("123");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle")
      .should("have.length", 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("123");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("123");
        }
      });

    cy.get("input").type("321");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("@circle")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("321");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("321");
        }
      });

    cy.get("button").contains("Удалить").click();
    cy.get("@circle")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("321");
        }
      });

    cy.tick(500);

    cy.get("@circle").should("have.length", 1);
  });

  it("stack cleanup check", () => {
    cy.clock();

    cy.get("input").type("123");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle")
      .should("have.length", 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("123");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("123");
        }
      });

    cy.get("input").type("321");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("@circle")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("321");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("321");
        }
      });

    cy.get("button").contains("Очистить").click();
    cy.get("@circle").should("have.length", 0);
  });
});
