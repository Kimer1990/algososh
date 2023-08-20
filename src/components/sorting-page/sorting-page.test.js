import { bubbleSort, selectionSort } from "./utils";

describe("SortingPage", () => {
  describe("correctly sorts an empty array", () => {
    it("in ascending order using the bubble method", async () => {
      expect(bubbleSort([], true)).toEqual([]);
    });
    it("in descending order using the bubble method", async () => {
      expect(bubbleSort([], false)).toEqual([]);
    });
    it("in ascending order using the select method", async () => {
      expect(selectionSort([], true)).toEqual([]);
    });
    it("in descending order using the select method", async () => {
      expect(selectionSort([], false)).toEqual([]);
    });
  });

  describe("correctly sorts an array with one element", () => {
    it("in ascending order using the bubble method", async () => {
      expect(bubbleSort([99], true)).toEqual([99]);
    });
    it("in descending order using the bubble method", async () => {
      expect(bubbleSort([99], false)).toEqual([99]);
    });
    it("in ascending order using the select method", async () => {
      expect(selectionSort([99], true)).toEqual([99]);
    });
    it("in descending order using the select method", async () => {
      expect(selectionSort([99], false)).toEqual([99]);
    });
  });

  describe("correctly sorts an array with multiple elements", () => {
    it("in ascending order using the bubble method", async () => {
      expect(bubbleSort([99, 56, 4, 32, 98, 5], true)).toEqual([
        4, 5, 32, 56, 98, 99,
      ]);
    });
    it("in descending order using the bubble method", async () => {
      expect(bubbleSort([99, 56, 4, 32, 98, 5], false)).toEqual([
        99, 98, 56, 32, 5, 4,
      ]);
    });
    it("in ascending order using the select method", async () => {
      expect(selectionSort([99, 56, 4, 32, 98, 5], true)).toEqual([
        4, 5, 32, 56, 98, 99,
      ]);
    });
    it("in descending order using the select method", async () => {
      expect(selectionSort([99, 56, 4, 32, 98, 5], false)).toEqual([
        99, 98, 56, 32, 5, 4,
      ]);
    });
  });
});
