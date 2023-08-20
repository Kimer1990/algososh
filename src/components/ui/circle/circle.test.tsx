import { Circle } from "./circle";
import TestRenderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  it("renders correctly without letter", () => {
    const circle = TestRenderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with letter", () => {
    const circle = TestRenderer.create(<Circle letter="L" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with head", () => {
    const circle = TestRenderer.create(<Circle head="H" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with React element in head", () => {
    const circle = TestRenderer.create(
      <Circle head={<span className="head">Head</span>} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with tail", () => {
    const circle = TestRenderer.create(<Circle tail="T" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with React element in tail", () => {
    const circle = TestRenderer.create(
      <Circle tail={<span className="tail">Tail</span>} tailType="element" />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with index", () => {
    const circle = TestRenderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with isSmall prop", () => {
    const circle = TestRenderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly in default state", () => {
    const circle = TestRenderer.create(
      <Circle state={ElementStates.Default} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly in changing state", () => {
    const circle = TestRenderer.create(
      <Circle state={ElementStates.Changing} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly in modified state", () => {
    const circle = TestRenderer.create(
      <Circle state={ElementStates.Modified} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
