import { Collection, display } from "./Collection";

export class LinkedList<T> implements Collection<T> {

  head: Node<T> | undefined;
  butt: Node<T> | undefined;
  size = 0;

  static zip<T>(ll1: LinkedList<T>, ll2: LinkedList<T>): LinkedList<T> {
    const zipped = new LinkedList<T>();
    let duration;
    let tracker1 = ll1.head;
    let tracker2 = ll2.head;
    ll1.size > ll2.size ? duration = ll1.size : duration = ll2.size;
    for (let i = 0; i < duration; i++) {
      if (tracker1?.item !== undefined) {
        zipped.append(tracker1.item);
        tracker1 = tracker1.next;
      }
      if (tracker2?.item !== undefined) {
        zipped.append(tracker2.item);
        tracker2 = tracker2.next;
      }
    }
    return zipped;
  }



  insert(item: T) {
    const newNode = { item, next: this.head };
    this.head = newNode;
    this.size += 1;
    if (this.butt === undefined) {
      this.butt = newNode;
    }
  }

  before(target: T, item: T) {
    let found = false;
    let tracker = this.head;
    while (tracker !== undefined) {
      if (tracker.next?.item === target && found === false) {
        found = true;
        const holdNext = tracker.next;
        tracker.next = { item, next: holdNext };
      } else if (tracker.item === target && found === false) {
        found = true;
        const holdNext = this.head;
        this.head = { item, next: holdNext };
      }
      tracker = tracker.next;
    }
    this.size += 1;
    if (found === false) {
      throw new Error('Could not find target node');
    }
  }

  after(target: T, item: T) {
    let tracker = this.head;
    let found = false;
    while (tracker !== undefined) {
      if (tracker.item === target && found === false) {
        found = true;
        const holdNext = tracker.next;
        tracker.next = { item, next: holdNext };
      }
      tracker = tracker.next;
    }
    this.size += 1;
    if (found === false) {
      throw new Error('Could not find target node');
    }
  };

  append(item: T) {
    if (this.butt) {
      const newNode = { item, next: undefined };
      this.butt.next = newNode;
      this.butt = newNode;
      this.size += 1;
    } else {
      this.insert(item);
    }
  };

  includes(item: T): boolean {
    let tracker = this.head;
    while (tracker !== undefined) {
      if (tracker.item === item) {
        return true;
      }
      tracker = tracker.next;
    }
    return false;
  };

  kthFromEnd(target: number): any {
    let tracker = this.head;
    if (this.size <= 0 || target < 1) { throw new Error };
    const loop = this.size - target;
    if (loop < 0) { throw new Error };
    tracker = this.head;
    for (let i = 0; i < loop; i++) {
      tracker = tracker?.next;
    }
    return tracker?.item;
  }

  push(item: T) {
    this.insert(item);
  }

  NQ(item: T) {
    this.append(item);
  }

  peek(): T {
    if (this.head === undefined) {
      throw new Error('Peeking on empty');
    }
    return this.head?.item;
  }

  remove(filter?: (t: T) => boolean): T {
    if (!this.head) {throw new Error('Removing from empty')};
    if (typeof filter == 'function') {
      let tracker = this.head;
      let previous: any = undefined;
      while (tracker !== undefined) {
        if (filter(tracker.item)) {
          if (this.head === tracker) {
            ////////////////////
            let target = this.head.item;
            this.head = this.head.next;
            this.size--;
            return target;
            ////////////////////
          } else if (previous !== undefined) {
            let target = tracker.item;
            previous.next = tracker.next;
            return target;
          }
        }
        previous = tracker;
        if (tracker.next) {
          tracker = tracker.next;
        }
      }
    }
    let target = this.head.item;
    this.head = this.head.next;
    this.size--;
    return target;
  }

  DQ(filter?: (t: T) => boolean): T {
    return this.remove(filter);
  }

  pop(filter?: (t: T) => boolean): T {
    return this.remove(filter);
  }

  get length(): number {
    return this.size;
  }

  empty(): boolean {
    return this.head ? true : false;
  }

  toString(): string {
    let tracker = this.head;
    let str = '';
    while (tracker !== undefined) {
      const strItem = display(tracker.item);
      str += `{ ${strItem} } -> `;
      tracker = tracker.next;
    }
    str += 'NULL';
    return str;
  };
};

interface Node<T> {
  item: T;
  next: Node<T> | undefined;
}