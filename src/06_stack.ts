// In this lesson we're going to implement a basic stack.
// The interfaces are given. Make sure the size cannot be modified from the
// outside.

// In JavaScript / TypeScript, we can declare getter functions using the
// following syntax:
//
// ```ts
// class MyClass {
//   get myProp (): number {
//     return 123;
//   }
// }
// ```
//
// The same works for setters, but we don't need them for this exercise.

interface IStack <T> {
  size: number;

  push (value: T): void;
  pop (): T;
  peek (): T;
  toArray (): Array<T>;
}

interface IStackFrame <T> {
  value: T;
  next: IStackFrame<T>;
  toArray (): Array<T>;
}

class StackFrame<T> {
  value: T
  next: IStackFrame<T>

  constructor(value: T, next: IStackFrame<T>) {
    this.value = value;
    this.next = next;
  }
  toArray() {
    return [this.value];
  }

}

export class Stack<T> {
  size: number
  top: IStackFrame<T>

  constructor() {
    this.size = 0;
  }
  push(value: T) {
    this.top = new StackFrame(value, this.top);
    this.size++;
  }
  pop():T {
    if (this.isEmpty()) {
      return null;
    }
    const oldTop = this.top;
    this.top = oldTop.next;
    this.size--;
    return oldTop.value;
  }
  peek():T{
    return this.top?.value ?? null;
  }
  isEmpty():boolean {
    return this.size === 0;
  }
  toArray():T[]{
    const toReturn = [];
    let currentVal = this.top;

    while (currentVal) {
      toReturn.push(currentVal.value);
      currentVal = currentVal.next;
    }

    return toReturn;
  }

}
