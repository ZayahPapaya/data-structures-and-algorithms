import { Collection, display } from "./Collection";


// handle hash collisions with linked list but keep list small
// (hash * largePrimeNumber(close to array size)) % (array size power of 2, close to dataset size)

// Your linked list from earlier labs
class LinkedList<V> implements Collection<V> {

  head: Node<V> | undefined;
  butt: Node<V> | undefined;
  size = 0;

  static zip<V>(ll1: LinkedList<V>, ll2: LinkedList<V>): LinkedList<V> {
    const zipped = new LinkedList<V>();
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



  insert(item: V) {
    const newNode = { item, next: this.head };
    this.head = newNode;
    this.size += 1;
    if (this.butt === undefined) {
      this.butt = newNode;
    }
  }

  before(target: V, item: V) {
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

  after(target: V, item: V) {
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

  append(item: V) {
    if (this.butt) {
      const newNode = { item, next: undefined };
      this.butt.next = newNode;
      this.butt = newNode;
      this.size += 1;
    } else {
      this.insert(item);
    }
  };

  includes(item: V): boolean {
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
  push(item: V) {
    this.insert(item);
  }
  NQ(item: V) {
    this.append(item);
  }
  peek(): V {
    if (this.head === undefined) {
      throw new Error('Peeking on empty');
    }
    return this.head?.item;
  }
  remove(filter?: (t: V) => boolean): V {
    if (!this.head) { throw new Error('Removing from empty') };
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
  DQ(filter?: (t: V) => boolean): V {
    return this.remove(filter);
  }
  pop(filter?: (t: V) => boolean): V {
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

interface Node<V> {
  item: V;
  next: Node<V> | undefined;
}

export class HashTable<K, V> {
  private data: Array<LinkedList<[string, number]>>;

  constructor(readonly capacity: number) {
    this.data = new Array(this.capacity);
  }

  get(key: string): number | never {
    const target = this.data[this.hash(key)];
    if (!target) throw new Error("Nah");
    let tracker = target.head;
    while (tracker !== undefined) {
      if (tracker.item[0] === key) return tracker.item[1];
      tracker = tracker.next;
    }
    throw new Error('nah');
  }

  set(key: string, value: number): void {
    const hash = this.hash(key)
    if (!this.data[hash]) {
      this.data[hash] = new LinkedList<[string, number]>();
      this.data[hash].insert([key, value]);
    } else {
      let found = false;
      let tracker = this.data[this.hash(key)].head
      while (tracker !== undefined) {
        if (tracker.item[0] === key) {
          tracker.item[1] = value;
          found = true;
        }
        tracker = tracker.next;
      }
      if(!found) this.data[hash].insert([key, value]);
    }
  }

  has(key: string): boolean {
    let target = this.data[this.hash(key)]
    if (!target) return false;
    let tracker = target.head
    while (tracker !== undefined) {
      if (tracker.item[0] === key) return true;
      tracker = tracker.next;
    }
    return false;
  }

  keys(): string[] {
    let output: string[] = [];
    this.data.forEach(list => {
      let tracker = list.head;
      while (tracker !== undefined) {
        output.push(tracker.item[0]);
        tracker = tracker.next;
      }
    })
    return output;
  }

  hash(key: string): number {
    let hash = key.split('').map(char => char.charCodeAt(0)).reduce((a: number, b: number) => a + b) % this.data.length;
    return hash;
  }
}