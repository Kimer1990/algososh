import {
  CIRCLE_CHANGING,
  CIRCLE_DEFAULT,
  CIRCLE_MODIFIED,
} from "../../src/constants/circle-color";

describe("List", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("if the input is empty, then the add buttons are not available", () => {
    cy.get("input[type='text']").should("have.value", "");
    cy.get("input[type='number']").should("have.value", "");
    cy.get("button").should("be.disabled").contains("Добавить в head");
    cy.get("button").should("be.disabled").contains("Добавить в tail");
    cy.get("button").should("be.disabled").contains("Добавить по индексу");
    cy.get("button").should("be.disabled").contains("Удалить по индексу");
  });

  it("checking the rendering of the default list", () => {
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });
  });

  it("checking if an element is added to head", () => {
    cy.clock();

    cy.get("input[type='text']").type("88");
    cy.get("button").contains("Добавить в head").click();
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("[class*=circle_small]").as("circle-small");
    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("88");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 4:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("88");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 4:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("88");
        }
      });

    cy.get("input[type='text']").should("have.value", "");
  });

  it("checking if an element is added to tail", () => {
    cy.clock();

    cy.get("input[type='text']").type("77");
    cy.get("button").contains("Добавить в tail").click();
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 3) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_CHANGING)
            .contains("77");
        }
        if (index === 4) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("9");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 3) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("9");
        }
        if (index === 4) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_MODIFIED)
            .contains("77");
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 4:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        if (index === 4) {
          cy.wrap($el)
            .should("have.css", "border", CIRCLE_DEFAULT)
            .contains("77");
        }
      });

    cy.get("input[type='text']").should("have.value", "");
  });

  it("check for adding an element by index", () => {
    cy.clock();

    cy.get("input[type='text']").type("55");
    cy.get("input[type='number']").type("2");
    cy.get("button").contains("Добавить по индексу").click();
    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 3:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("55");
            break;
          case 1:
            cy.wrap($el).contains("67");
            break;
          case 2:
            cy.wrap($el).contains("22");
            break;
          case 3:
            cy.wrap($el).contains("78");
            break;
          case 4:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 4:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("55");
            break;
          case 2:
            cy.wrap($el).contains("22");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 4:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("22");
            break;
          case 2:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("55");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("22");
            break;
          case 2:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_MODIFIED)
              .contains("55");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 2:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("55");
            break;
          default:
            return;
        }
      });

    cy.get("input[type='text']").should("have.value", "");
    cy.get("input[type='number']").should("have.value", "");
  });

  it("checking to remove an element from head", () => {
    cy.clock();

    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });
    cy.get("@circle-content")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 3:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.get("button").contains("Удалить из head").click();

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 2:
            cy.wrap($el).contains("22");
            break;
          case 3:
            cy.wrap($el).contains("78");
            break;
          case 4:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el).contains("head");
          break;
        case 4:
          cy.wrap($el).contains("tail");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("22");
            break;
          case 1:
            cy.wrap($el).contains("78");
            break;
          case 2:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
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
  });

  it("checking if an element is removed from tail", () => {
    cy.clock();

    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("head");
            break;
          case 3:
            cy.wrap($el).contains("tail");
            break;
          default:
            return;
        }
      });

    cy.get("button").contains("Удалить из tail").click();

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 4:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("9");
            break;
          default:
            return;
        }
      });
    cy.get("@circle-content").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el).contains("head");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
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
  });

  it("checking element removal by index", () => {
    cy.clock();

    cy.get("[class*=circle_circle]").as("circle");
    cy.get("[class*=circle_content]").as("circle-content");
    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el).contains("head");
          break;
        case 3:
          cy.wrap($el).contains("tail");
          break;
        default:
          return;
      }
    });

    cy.get("input[type='number']").type("2");
    cy.get("button").contains("Удалить по индексу").click();

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el).contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("22");
            break;
          case 2:
            cy.wrap($el).contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("22");
            break;
          case 2:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("78");
            break;
          case 3:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("22");
            break;
          case 2:
            cy.wrap($el).should("have.css", "border", CIRCLE_DEFAULT);
            break;
          case 3:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_CHANGING)
              .contains("78");
            break;
          case 4:
            cy.wrap($el).contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el).contains("head");
          break;
        case 4:
          cy.wrap($el).contains("tail");
          break;
        default:
          return;
      }
    });

    cy.tick(500);

    cy.get("@circle")
      .should("have.length", 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("67");
            break;
          case 1:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("22");
            break;
          case 2:
            cy.wrap($el)
              .should("have.css", "border", CIRCLE_DEFAULT)
              .contains("9");
            break;
          default:
            return;
        }
      });

    cy.get("@circle-content").each(($el, index) => {
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

    cy.get("input[type='number']").should("have.value", "");
  });
});
