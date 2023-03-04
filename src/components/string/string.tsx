import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./string.module.css";
import { TArray } from "./utils";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState("");
  const [arrayLetters, setArrayLetters] = useState<Array<TArray>>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const reverse = (arr: TArray[]) => {
    let head = 0;
    let tail = arr.length - 1;

    changeColor(arr, head, tail, ElementStates.Changing);

    if (head <= tail) {
      const interval = setInterval(() => {
        const temp = arr[head];
        arr[head] = arr[tail];
        arr[tail] = temp;

        changeColor(arr, head, tail, ElementStates.Modified);

        head++;
        tail--;

        if (head > tail) {
          clearInterval(interval);
        } else {
          changeColor(arr, head, tail, ElementStates.Changing);
        }
      }, SHORT_DELAY_IN_MS);
    }
  };

  const changeColor = (
    arr: TArray[],
    head: number,
    tail: number,
    color: ElementStates
  ) => {
    arr[head].color = color;
    arr[tail].color = color;
    const newArr: TArray[] = arr.concat();

    setArrayLetters(newArr);
  };

  const clickButton = () => {
    const arr = valueInput
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));

    setArrayLetters(arr);
    setValueInput("");

    setTimeout(() => reverse(arr), SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange} value={valueInput}></Input>
          </div>
          <Button
            text="Развернуть"
            type="submit"
            onClick={clickButton}
            disabled={valueInput === "" || valueInput.length > 11}
          />
        </div>
        Максимум 11 символов
      </div>

      <ul className={styles.curcles}>
        {arrayLetters.map((item, index) => (
          <li className={styles.curcle} key={index}>
            <Circle letter={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
