import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

import styles from "./sorting.module.css";
import { randomArr, TArray } from "./utils";

export const SortingPage: React.FC = () => {
  const [methodSorting, setMethodSorting] = useState("selection");
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    asc: false,
    desc: false,
  });

  const [array, setArray] = useState<Array<TArray>>(randomArr);

  const bubbleSort = async (newArr: Array<TArray>, direction: boolean) => {
    if (direction === true) {
      setIsLoading({ ...isLoading, asc: true });
    } else {
      setIsLoading({ ...isLoading, desc: true });
    }

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length - i - 1; j++) {
        newArr[j].color = ElementStates.Changing;
        newArr[j + 1].color = ElementStates.Changing;
        setArray([...newArr]);
        await delay(SHORT_DELAY_IN_MS);
        if (direction === true) {
          if (newArr[j].value > newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        } else {
          if (newArr[j].value < newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }
        newArr[j].color = ElementStates.Default;
        newArr[j + 1].color = ElementStates.Default;
      }
      newArr[newArr.length - i - 1].color = ElementStates.Modified;
    }

    setIsLoading({ asc: false, desc: false });
  };

  const selectionSort = async (newArr: Array<TArray>, direction: boolean) => {
    if (direction === true) {
      setIsLoading({ ...isLoading, asc: true });
    } else {
      setIsLoading({ ...isLoading, desc: true });
    }

    for (let i = 0; i < newArr.length; i++) {
      let index = i;
      newArr[index].color = ElementStates.Changing;
      setArray([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
      for (let j = i + 1; j < newArr.length; j++) {
        newArr[j].color = ElementStates.Changing;
        setArray([...newArr]);
        if (direction === true) {
          if (newArr[j].value < newArr[index].value) {
            newArr[index].color = ElementStates.Default;
            index = j;
            newArr[index].color = ElementStates.Changing;
          } else {
            newArr[j].color = ElementStates.Default;
          }
        } else {
          if (newArr[j].value > newArr[index].value) {
            newArr[index].color = ElementStates.Default;
            index = j;
            newArr[index].color = ElementStates.Changing;
          } else {
            newArr[j].color = ElementStates.Default;
          }
        }
        await delay(SHORT_DELAY_IN_MS);
      }
      let temp = newArr[index];
      newArr[index] = newArr[i];
      newArr[i] = temp;
      newArr[index].color = ElementStates.Default;
      newArr[i].color = ElementStates.Modified;
      setArray([...newArr]);
      await delay(SHORT_DELAY_IN_MS);

      setIsLoading({ asc: false, desc: false });
    }
  };

  const clickButtonUp = () => {
    if (methodSorting === "bubble") {
      bubbleSort(array, true);
    } else {
      selectionSort(array, true);
    }
  };

  const clickButtonDown = () => {
    if (methodSorting === "bubble") {
      bubbleSort(array, false);
    } else {
      selectionSort(array, false);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.flex}>
          <RadioInput
            label={"Выбор"}
            checked={methodSorting === "selection"}
            onChange={() => setMethodSorting("selection")}
          />
          <RadioInput
            label={"Пузырек"}
            checked={methodSorting === "bubble"}
            onChange={() => setMethodSorting("bubble")}
          />
        </div>
        <div className={styles.flex}>
          <div className={styles.btn}>
            <Button
              text="По возрастанию"
              type="submit"
              onClick={clickButtonUp}
              sorting={Direction.Ascending}
              disabled={array.length === 0 || isLoading.desc}
              isLoader={isLoading.asc}
            />
          </div>
          <div className={styles.btn}>
            <Button
              text="По убыванию"
              type="submit"
              onClick={clickButtonDown}
              sorting={Direction.Descending}
              disabled={array.length === 0 || isLoading.asc}
              isLoader={isLoading.desc}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <Button
            text="Новый массив"
            type="submit"
            disabled={isLoading.desc || isLoading.asc}
            onClick={() => {
              setArray(randomArr());
            }}
          />
        </div>
      </div>
      <ul className={styles.columns}>
        {array.map((item, index) => (
          <li className={styles.column} key={index}>
            <Column index={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
