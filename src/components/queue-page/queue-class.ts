interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number };
  getTail: () => { value: T | null; index: number };
  clear: () => void;
}

export default class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead = (): { value: T | null; index: number } => {
    if ((this.head - 1) % this.size === 0 || this.head === 0) {
      return {
        value: this.container[0],
        index: 0,
      };
    } else {
      return {
        value: this.container[(this.head - 1) % this.size],
        index: (this.head - 1) % this.size,
      };
    }
  };

  getTail = (): { value: T | null; index: number } => {
    if ((this.tail - 1) % this.size === 0) {
      return {
        value: this.container[0],
        index: 0,
      };
    } else {
      return {
        value: this.container[(this.tail - 1) % this.size],
        index: (this.tail - 1) % this.size,
      };
    }
  };

  getLength = (): number => {
    return this.length;
  };
}
