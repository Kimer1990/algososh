import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: string;
  color: ElementStates;
};

export const reverse = (arr: string[]) => {
  let head = 0;
  let tail = arr.length - 1;

  while (head <= tail) {
    const temp = arr[head];
    arr[head] = arr[tail];
    arr[tail] = temp;
    head++;
    tail--;
  }
  return arr;
};
