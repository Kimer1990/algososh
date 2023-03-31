import { render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Button } from "./button";

describe("Button", () => {
  it("renders a button with text", () => {
    const button = TestRenderer.create(<Button text="Click me" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders a button without text", () => {
    const button = TestRenderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders a disabled button", () => {
    const button = TestRenderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders a button with a loading indicator", () => {
    const button = TestRenderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("calls the onClick function when the button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button text="Click me" onClick={handleClick} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
