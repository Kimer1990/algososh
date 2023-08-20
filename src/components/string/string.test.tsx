import { reverse } from "./utils";

describe("StringComponent", () => {
  it("correctly reverses a string with even number of characters", async () => {
    expect(reverse(["1", "2", "3", "4"])).toEqual(["4", "3", "2", "1"]);
  });

  it("correctly reverses a string with odd number of characters", async () => {
    expect(reverse(["1", "2", "3", "4", "5"])).toEqual([
      "5",
      "4",
      "3",
      "2",
      "1",
    ]);
  });

  it("correctly reverses a string with one character", async () => {
    expect(reverse(["1"])).toEqual(["1"]);
  });

  it("correctly handles an empty string", async () => {
    expect(reverse([])).toEqual([]);
  });
});
