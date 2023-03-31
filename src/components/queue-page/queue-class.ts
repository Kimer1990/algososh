interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number } | undefined;
  getTail: () => { value: T | null; index: number } | undefined;
  clear: () => void;
}

export default class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head: number | undefined = undefined;
  tail: number | undefined = undefined;
  size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    if (this.tail === undefined) {
      console.log("+");
      this.tail = 0;
      this.head = 0;
      this.container[this.tail % this.size] = item;
      console.log(this.container[this.tail % this.size]);
    } else {
      this.tail++;
      this.length++;
      this.container[this.tail % this.size] = item;
    }
  }

  dequeue() {
    if (this.head !== undefined) {
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    }
  }

  clear = () => {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  };

  getHead = (): { value: T | null; index: number } | undefined => {
    console.log("getHead", this.head);
    if (this.head !== undefined) {
      if (this.head % this.size === 0 || this.head === 0) {
        return {
          value: this.container[0],
          index: 0,
        };
      } else {
        return {
          value: this.container[this.head % this.size],
          index: this.head % this.size,
        };
      }
    } else {
      return undefined;
    }
  };

  getTail = (): { value: T | null; index: number } | undefined => {
    if (this.tail !== undefined) {
      if (this.tail % this.size === 0) {
        return {
          value: this.container[0],
          index: 0,
        };
      } else {
        return {
          value: this.container[this.tail % this.size],
          index: this.tail % this.size,
        };
      }
    } else {
      return undefined;
    }
  };

  getLength = (): number => {
    return this.length;
  };
}
