import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Queue from "./queue-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

import styles from "./queue.module.css";
import { initialArr, TArray } from "./utils";

export const QueuePage: React.FC = () => {
  const queueSize = 7;
  const queue = useMemo(() => new Queue<string>(queueSize), []);

  const [valueInput, setValueInput] = useState<string>("");
  const [array, setArray] = useState<TArray[]>(initialArr);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {
    setValueInput("");

    const newArray = array.concat();

    queue.enqueue(valueInput);

    const head = queue.getHead();
    const tail = queue.getTail();

    newArray[head.index].value = head.value;
    if (head.index === 0) {
      newArray[head.index].head = HEAD;
    } else if ((head.index + 1) % queueSize === 0) {
      array[0].head = HEAD;
    } else {
      newArray[head.index + 1].head = HEAD;
    }

    if (tail.index > 0) {
      newArray[tail.index - 1].tail = "";
    } else if (tail.index === 0) {
      newArray[newArray.length - 1].tail = "";
    }

    newArray[tail.index].value = tail.value;
    newArray[tail.index].tail = TAIL;
    newArray[tail.index].color = ElementStates.Changing;
    setArray(newArray);

    setTimeout(() => {
      const array = [...newArray];
      array[tail.index].color = ElementStates.Default;
      setArray(array);
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonDel = () => {
    const newArray = [...array];
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index + 1 === tail.index) {
      clickButtonClear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      newArray[head.index].color = ElementStates.Changing;

      setArray(newArray);

      setTimeout(() => {
        const array = [...newArray];

        array[head.index].color = ElementStates.Default;
        if (head.index >= 0) {
          array[head.index].head = "";
          array[head.index].value = "";
        }
        array[head.index].value = head.value;
        if ((head.index + 1) % queueSize > 0 || head.index === 0) {
          array[head.index + 1].head = HEAD;
        } else if ((head.index + 1) % queueSize === 0) {
          array[0].head = HEAD;
        }
        setArray(array);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const clickButtonClear = () => {
    queue.clear();

    setArray(
      Array.from({ length: queueSize }, () => ({
        value: "",
        color: ElementStates.Default,
      }))
    );
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange} value={valueInput}></Input>
            <p className={styles.maxText}>Максимум 4 символа</p>
          </div>
          <div>
            <Button
              text="Добавить"
              type="submit"
              onClick={clickButtonAdd}
              disabled={
                valueInput === "" ||
                valueInput.length > 4 ||
                queue.getLength() >= queueSize
              }
            />
          </div>{" "}
          <div className={styles.btnDelete}>
            <Button
              text="Удалить"
              type="submit"
              onClick={clickButtonDel}
              disabled={array.length === 0}
            />
          </div>
          <div>
            <Button
              text="Очистить"
              type="submit"
              onClick={clickButtonClear}
              disabled={array.length === 0}
            />
          </div>
        </div>
      </div>

      <ul className={styles.curcles}>
        {array.map((item, index) => (
          <li className={styles.curcle} key={index}>
            {item.head === HEAD && <p className={styles.head}>head</p>}
            <Circle letter={item.value} state={item.color} />

            <p>{index}</p>
            {item.tail === TAIL && <p>tail</p>}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
