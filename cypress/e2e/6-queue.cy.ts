import {
  CIRCLE_CHANGING,
  CIRCLE_DEFAULT,
} from "../../src/constants/circle-color";

describe("Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled").contains("Добавить");
    cy.get("button").should("be.disabled").contains("Удалить");
    cy.get("button").should("be.disabled").contains("Очистить");
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle").should("have.length", 7);
  });

  it("check for adding and removing an element to the queue", () => {
    cy.clock();

    cy.get("input").type("123");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("123");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("123");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.get("input").type("321");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("321");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("321");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 1:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.get("input").type("3");
    cy.get("button").contains("Добавить").click();
    cy.get("input").should("have.value", "");
    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 2) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("3");
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        if (index === 2) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("3");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 2:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.get("button").contains("Удалить").click();
    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("123");
            break;
          case 1:
            cy.wrap($el).contains("321");
            break;
          case 2:
            cy.wrap($el).contains("3");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).should("have.css", "border", CIRCLE_DEFAULT);
            break;
          case 1:
            cy.wrap($el).contains("321");
            break;
          case 2:
            cy.wrap($el).contains("3");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content")
      .should("have.length", 7)
      .each(($el, index) => {
        switch (index) {
          case 1:
            cy.wrap($el).contains("head");
            break;
          case 2:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });
  });

  it("queue cleanup check", () => {
    cy.get("button").contains("Очистить").click();
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle")
      .should("have.length", 7)
      .each(($el) => {
        expect($el.text(""));
      });
  });
});
