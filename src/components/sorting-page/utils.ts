import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: number;
  color: ElementStates;
};

export const randomArr = () => {
  const arr = [];
  const length = Math.floor(Math.random() * 13) + 3;
  for (let i = 0; i < length; i++) {
    arr.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return arr;
};

export const bubbleSort = (newArr: number[], direction: boolean) => {
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length - i - 1; j++) {
      if (direction === true) {
        if (newArr[j] > newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      } else {
        if (newArr[j] < newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      }
    }
  }
  return newArr;
};

export const selectionSort = (newArr: number[], direction: boolean) => {
  for (let i = 0; i < newArr.length; i++) {
    let index = i;
    for (let j = i + 1; j < newArr.length; j++) {
      if (direction === true) {
        if (newArr[j] < newArr[index]) {
          index = j;
        }
      } else {
        if (newArr[j] > newArr[index]) {
          index = j;
        }
      }
    }
    let temp = newArr[index];
    newArr[index] = newArr[i];
    newArr[i] = temp;
  }
  return newArr;
};
