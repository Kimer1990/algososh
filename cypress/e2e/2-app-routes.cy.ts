describe("Тестирование переходов по страницам", () => {
  beforeEach("проверка работоспособности сайта", () => {
    cy.visit("/");
  });

  describe("routing test:", () => {
    it("works on localhost:3000/recursion", () => {
      cy.visit("/recursion");
      cy.contains("Строка");
    });

    it("works on localhost:3000/fibonacci", () => {
      cy.visit("/fibonacci");
      cy.contains("Последовательность Фибоначчи");
    });

    it("works on localhost:3000/sorting", () => {
      cy.visit("/sorting");
      cy.contains("Сортировка массива");
    });

    it("works on localhost:3000/stack", () => {
      cy.visit("/stack");
      cy.contains("Стек");
    });

    it("works on localhost:3000/queue", () => {
      cy.visit("/queue");
      cy.contains("Очередь");
    });

    it("works on localhost:3000/list", () => {
      cy.visit("/list");
      cy.contains("Связный список");
    });
  });
});
