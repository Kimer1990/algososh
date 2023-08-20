import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import LinkedList from "./list-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./list.module.css";
import { TDownCircle, TArray, defaultArray } from "./utils";

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<string>(), []);

  const [valueInput, setValueInput] = useState<any>("");
  const [indexInput, setIndexInput] = useState<any>("");

  const [indexUpCircle, setIndexUpCircle] = useState<number | null>(null);
  const [indexDownCircle, setIndexDownCircle] = useState<TDownCircle>({
    value: "",
    index: null,
  });
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    addToHead: false,
    addToTail: false,
    delHead: false,
    delTail: false,
    addByIndex: false,
    delByIndex: false,
  });

  const [array, setArray] = useState<TArray[]>(defaultArray);

  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const onChangeIndexInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.currentTarget.value);
  };

  const clickButtonAddToHead = () => {
    setIsLoading({ ...isLoading, addToHead: true });
    setIndexUpCircle(0);

    const newArray = array.concat();

    setTimeout(() => {
      list.addToHead(valueInput);

      const newElement = {
        value: valueInput,
        color: ElementStates.Changing,
      };

      newArray.unshift(newElement);

      setArray(newArray);
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];
      array[0].color = ElementStates.Modified;
      setArray(array);

      setTimeout(() => {
        const array = [...newArray];
        array[0].color = ElementStates.Default;
        setArray(array);
        setValueInput("");
        setIsLoading({ ...isLoading, addToHead: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonAddToTail = () => {
    setIsLoading({ ...isLoading, addToTail: true });
    setIndexUpCircle(array.length - 1);

    const newArray = array.concat();

    setTimeout(() => {
      setIndexUpCircle(array.length);

      list.addToTail(valueInput);

      const newElement = {
        value: valueInput,
        color: ElementStates.Changing,
      };

      newArray.push(newElement);

      setArray(newArray);
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];
      array[array.length - 1].color = ElementStates.Modified;
      setArray(array);

      setTimeout(() => {
        const array = [...newArray];
        array[array.length - 1].color = ElementStates.Default;
        setArray(array);
        setValueInput("");
        setIsLoading({ ...isLoading, addToTail: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonDelHead = () => {
    setIsLoading({ ...isLoading, delHead: true });
    const newArray = array.concat();
    const downCircle = {
      value: newArray[0].value,
      index: 0,
    };

    setIndexDownCircle(downCircle);

    list.delFromHead();

    newArray[0].value = "";

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];
      array.shift();

      setArray(array);
      setIsLoading({ ...isLoading, delHead: false });
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonDelTail = () => {
    setIsLoading({ ...isLoading, delTail: true });
    const newArray = array.concat();

    const downCircle = {
      value: newArray[newArray.length - 1].value,
      index: newArray.length - 1,
    };

    setIndexDownCircle(downCircle);

    list.delFromTail();

    newArray[newArray.length - 1].value = "";

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];
      array.pop();

      setArray(array);
      setIsLoading({ ...isLoading, delTail: false });
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonAddByIndex = () => {
    setIsLoading({ ...isLoading, addByIndex: true });
    const newArray = array.concat();

    let i = 0;

    const interval = setInterval(() => {
      if (i > indexInput) {
        const array = [...newArray];
        array.forEach((e) => (e.color = ElementStates.Default));
        setArray(array);
        list.addByIndex(indexInput, valueInput);

        const newElement = {
          value: valueInput,
          color: ElementStates.Modified,
        };

        newArray.splice(indexInput, 0, newElement);

        setArray(newArray);

        setIndexUpCircle(null);

        setTimeout(() => {
          const array = [...newArray];
          array[indexInput].color = ElementStates.Default;
          setArray(array);
          setValueInput("");
          setIndexInput("");
          setIsLoading({ ...isLoading, addByIndex: false });
        }, SHORT_DELAY_IN_MS);
        clearInterval(interval);
      } else {
        if (i !== 0) {
          const array = [...newArray];
          array[i - 1].color = ElementStates.Changing;
          setArray(array);
        }
        setIndexUpCircle(i);
        i++;
      }
    }, SHORT_DELAY_IN_MS);
  };

  const clickButtonDelByIndex = () => {
    setIsLoading({ ...isLoading, delByIndex: true });
    const newArray = array.concat();

    const idx = parseInt(indexInput);

    let i = 0;

    const interval = setInterval(() => {
      if (i > indexInput) {
        console.log(i, "+");
        const downCircle = {
          value: newArray[idx].value,
          index: idx,
        };

        setIndexDownCircle(downCircle);

        list.delByIndex(indexInput);

        newArray[indexInput].value = "";
        newArray[indexInput].color = ElementStates.Default;

        setArray(newArray);

        setTimeout(() => {
          const downCircle = {
            value: "",
            index: null,
          };

          setIndexDownCircle(downCircle);
          const array = [...newArray];

          array.splice(indexInput, 1);
          array.forEach((e) => (e.color = ElementStates.Default));

          setArray(array);
          setIndexInput("");
          setIsLoading({ ...isLoading, delByIndex: false });
        }, SHORT_DELAY_IN_MS);
        clearInterval(interval);
      } else {
        const array = [...newArray];
        array[i].color = ElementStates.Changing;
        setArray(array);
        i++;
      }
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stringbox}>
        <div className={styles.stringbox}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите значение"
                maxLength={4}
                onChange={onChangeValueInput}
                value={valueInput}
                disabled={
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
              ></Input>
              <p className={styles.maxText}>Максимум 4 символа</p>
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в head"
                type="submit"
                onClick={clickButtonAddToHead}
                disabled={
                  valueInput.length > 4 ||
                  valueInput === "" ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.addToHead}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в tail"
                type="submit"
                onClick={clickButtonAddToTail}
                disabled={
                  valueInput.length > 4 ||
                  valueInput === "" ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.addToTail}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Удалить из head"
                type="submit"
                onClick={clickButtonDelHead}
                disabled={
                  array.length === 0 ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.delHead}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Удалить из tail"
                type="submit"
                onClick={clickButtonDelTail}
                disabled={
                  array.length === 0 ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.delTail}
              />
            </div>{" "}
          </div>
        </div>

        <div className={styles.stringboxSecond}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите индекс"
                onChange={onChangeIndexInput}
                max={array.length - 1}
                min={0}
                value={indexInput}
                type={"number"}
                disabled={
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
              ></Input>
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Добавить по индексу"
                type="submit"
                onClick={clickButtonAddByIndex}
                disabled={
                  indexInput > array.length ||
                  valueInput === "" ||
                  indexInput === "" ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.addByIndex}
                extraClass={styles.buttonWidth}
              />
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Удалить по индексу"
                type="submit"
                onClick={clickButtonDelByIndex}
                disabled={
                  indexInput === "" ||
                  indexInput > array.length - 1 ||
                  isLoading.addToHead ||
                  isLoading.addToTail ||
                  isLoading.delHead ||
                  isLoading.delTail ||
                  isLoading.addByIndex ||
                  isLoading.delByIndex
                }
                isLoader={isLoading.delByIndex}
                extraClass={styles.buttonWidth}
              />
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.circles}>
        {array.map((item, index) => (
          <li className={styles.circle} key={index}>
            <div>
              {index === indexUpCircle && (
                <Circle
                  state={ElementStates.Changing}
                  letter={valueInput}
                  isSmall={true}
                  extraClass={styles.upCircle}
                />
              )}
              <Circle
                letter={item.value}
                state={item.color}
                head={index === 0 && index !== indexUpCircle ? "head" : ""}
                tail={
                  index === array.length - 1 && index !== indexDownCircle.index
                    ? "tail"
                    : ""
                }
                index={index}
              />
              {index === indexDownCircle.index && (
                <Circle
                  state={ElementStates.Changing}
                  letter={indexDownCircle.value}
                  isSmall={true}
                  extraClass={styles.downCircle}
                />
              )}
            </div>
            {index !== array.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
