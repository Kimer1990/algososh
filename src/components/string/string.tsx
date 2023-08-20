import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

import styles from "./string.module.css";
import { TArray } from "./utils";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState("");
  const [arrayLetters, setArrayLetters] = useState<Array<TArray>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const reverse = async (arr: TArray[]) => {
    setIsLoading(true);
    let head = 0;
    let tail = arr.length - 1;

    while (head <= tail) {
      changeColor(arr, head, tail, ElementStates.Changing);
      await delay(SHORT_DELAY_IN_MS);
      const temp = arr[head];
      arr[head] = arr[tail];
      arr[tail] = temp;
      changeColor(arr, head, tail, ElementStates.Modified);
      head++;
      tail--;
    }
    setIsLoading(false);
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
            <Input
              type="text"
              maxLength={11}
              onChange={onChange}
              value={valueInput}
            ></Input>
          </div>
          <div className={styles.btn}>
            <Button
              text="Развернуть"
              type="submit"
              onClick={clickButton}
              disabled={valueInput === "" || valueInput.length > 11}
              isLoader={isLoading}
            />
          </div>
        </div>
        Максимум 11 символов
      </div>

      <ul className={styles.circles}>
        {arrayLetters.map((item, index) => (
          <li className={styles.circle} key={index}>
            <Circle letter={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
