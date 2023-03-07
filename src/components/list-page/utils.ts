import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: string;
  color: ElementStates;
  tail?: string;
  head?: string;
};

export type TDownCircle = {
  value: string;
  index: number | null;
};

export const defaultArray = [
  {
    value: "67",
    color: ElementStates.Default,
  },
  {
    value: "22",
    color: ElementStates.Default,
  },
  {
    value: "78",
    color: ElementStates.Default,
  },
  {
    value: "9",
    color: ElementStates.Default,
  },
];
