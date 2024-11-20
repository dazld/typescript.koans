// Let's start with something simple.
// In this file, a bunch of functions are defined.
// The tests are passing and can be checked in the test folder.
// The goal is to add typing information (as much as possible)

// This first example shows you how to prevent someone from
// calling this function with something else than numbers
// Nothing to do here
export function addNumbers(x: number, y: number): number {
  return x + y;
}

// We might also want to "add" strings:
// Even though the current implementation is the same and could work for
// both strings and numbers, the goal of this function is to add strings.
// By enforcing this in the function signature, we can safely change
// its implementation later
export function addStrings(x:string, y:string): string {
  return x + y;
}

// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Util functions
// Let's start with the util function, since they don't require too much
// knowledge of the TypeScript's type system.

// The identity function simply returns its first argument.
// This function can accept any type!
// But it always returns something of the same type as what was provided.
// Hint: Use a generic type (<T>).
export function identity<T>(item:T): T {
  return item;
}

type VarArgFn = (...args:any[]) => any

// ## attempt
// attempt applies the passed in function with the supplied arguments. If the
// function throws an error, the error is being returned. If the function does
// not throw an error, the result is being returned.
export function attempt<T extends VarArgFn> (
  func: T,
  ...args: Parameters<T>): ReturnType<T> | Error {
  try {
    return func(...args);
  } catch(err) {
    return err instanceof  Error ? err : new Error(String(err));
  }
}

function flakyMax(...args:number[]): number {
  if (Math.random() > 0.5) {
    throw new Error('nope')
  }

  return Math.max.apply(Math, args)
}

const a = attempt(flakyMax, 1, 2, 3, 4)

if (a instanceof Error) {
  console.error(a)
} else {
  console.log(a / 10)
}



// ### constant
// constant returns a function that returns a the passed in value.
export function constant(value:any): ()=>any {
  return function() {
    return value;
  }
}

// ### noop
// noop can be called with arbitrary arguments, it will always return
// `undefined`.
export function noop():void {}

// ### times
// times invokes the passed in iteratee (2nd argument) n times. It returns an
// array of results.
export function times<T, K, V>(n:number, iteratee: (index:number)=>T): T[] {
  // If the fill function doesn't exist then implement it...
  return Array(n).fill('').map((o, i:number) => iteratee(i));
}

const aa = times(10, (n)=>n+1)
const strings = times(10, (n)=> `${n} thing`)

const bb = aa.reduce((acc, n)=>acc+n, 0)
