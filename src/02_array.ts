// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Array functions

/**
 * ### chunk
 * chunk creates an array of elements split into groups the length of size. If
 * array can't be split evenly, the final chunk will be the remaining elements.
 * Two-dimensional arrays can be expressed using the T[][].
 *
 *  ## Examples
 *  _.chunk(["a", "b", "c", "d"], 2) => [["a", "b"], ["c", "d"]]
 *  _.chunk(["a", "b", "c", "d"], 3) => [["a", "b", "c"], ["d"]]
 *  _.chunk(["a", "b", "c"]) => [["a"], ["b"], ["c"]]
 * */
export function chunk<T>(collection: T[], size: number = 1): T[][] {
  return collection.reduce(
    (chunks: T[][], item: T): T[][] => {
      const currentChunk: T[] = chunks[chunks.length - 1] ?? [];
      const nextChunk: T[] = currentChunk.length < size ? currentChunk : []

      nextChunk.push(item);

      if (nextChunk !== currentChunk || chunks.length === 0) {
        chunks.push(nextChunk)
      }

      return chunks;
    },
    [])
}


/**
 * ### compact
 * compact accepts an array as an argument and returns an array.
 * The returned array does not contain falsey values (such as 0, null,
 * undefined, NaN).
 *
 * ## Examples
 * _.compact([1, undefined, 2, undefined, 3]) => [1, 2, 3]
 * _.compact([1, NaN, 2, NaN, 3]) => [1, 2, 3]
 * _.compact([1, null, 2, null, 3]) => [1, 2, 3]
 * _.compact([1, 0, 2, 0, 3]) => [1, 2, 3]
 * _.compact([1, undefined, NaN, null, 0, 2, 3]) => [1, 2, 3]
 */

// note, Sets and Arrays use the sameValueZero algorithm to compare values, which means that
// valsToRemove.has(NaN) works correctly - NaN is not normally comparable by value.
const valsToRemove = new Set<any>([false, NaN, null, 0, undefined]);

export function compact<T>(collection: T[]): T[] {
  return collection.filter((v: T) => !(valsToRemove.has(v)));
}

/**
 * ### head
 * head takes in an array and returns its first item.
 *
 *  ## Examples
 *  _.head([1, 2, 3]) => 1
 *  _.head([]) => undefined
 */
export function head<T>(collection: T[]): T {
  return collection[0];
}

/**
 * ### initial
 * initial returns a slice of the passed in array, excluding its last item.
 *
 * ## Examples
 *  _.initial<number>([1, 2, 3]) => [1, 2]
 *
 */
export function initial<T>(collection: T[]): T[] {
  return collection.slice(0, collection.length - 1);

}

/**
 * ### last
 * last takes in an array and returns its last item.
 *
 * ## Examples
 * _.last([1, 2, 3]) => 3
 * _.last([]) => undefined
 *
 */
export function last<T>(collection: T[]): T {
  return collection[collection.length - 1];
}

/**
 * ### drop
 * drop takes in two arguments, an array and a count, and returns an array that
 * has count items removed from the beginning.
 * The count should be optional and default to 1.
 *
 * ## Examples
 * _.drop([1, 2, 3, 4], 2) => [3, 4]
 * _.drop([1, 2, 3, 4]) => [2, 3, 4]
 */
export function drop<T>(collection: T[], index: number = 1): T[] {
  // slice is exclusive on end index
  return collection.slice(index, collection.length);
}

/**
 * ### dropRight
 * dropRight works like drop, except that it removes items from the end of the
 * passed in array.
 *
 * ## Examples
 * _.dropRight([1, 2, 3, 4], 2) => [1, 2]
 * _.dropRight([1, 2, 3, 4]) => [1, 2, 3]
 *
 */
export function dropRight<T>(collection: T[], index: number = 1) {
  return collection.slice(0, collection.length - index);
}

interface DropWhilePredicate<T> {
  (value?: T,
   index?: number,
   collection?: Array<T>): boolean;
}

/**
 * ### dropWhile
 * dropWhile works similar to drop. It removes items from the beginning of the
 * array until the predicate returns false.
 *
 * ## Examples
 * _.dropWhile([1, 2, 3, 4, 5, 1], value => value < 3) => [3, 4, 5, 1]
 *
 */
export function dropWhile<T>(collection: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
  return collection.reduce((acc, v) => {
    if (acc.length !== 0 || predicate(v) === false) {
      acc.push(v)
    }
    return acc;
  }, []);
}

/**
 * ### dropRightWhile
 * dropRightWhile works similar to dropWhile, except that it iterates over the
 * passed in array in reversed order.
 *
 * ## Examples
 * _.dropRightWhile([5, 4, 3, 2, 1], value => value < 3) => [5, 4, 3]
 *
 */
export function dropRightWhile<T>(collection: T[], predicate: DropWhilePredicate<T>): T[] {
  const nextCollection = [];

  for (let i = collection.length - 1; i >= 0 && i < collection.length; i--) {
    if (nextCollection.length !== 0 || predicate(collection[i]) === false) {
      nextCollection.unshift(collection[i])
    }
  }

  return nextCollection;
}

/**
 * ### fill
 * fill mutates the passed in array. It fills collection[start] up to
 * collection[end] (exclusive) with a specified value.
 *
 * ## Examples
 * _.fill<any>([4, 6, 8, 10], "*", 1, 3) => [4, "* ", "* ", 10]
 */
export function fill<T>(collection: T[], value: T, start: number, end: number): T[] {
  for (let i = start; i < end; i++) {
    collection[i] = value;
  }

  return collection;
}

// Here we define an interface for the predicate used in the findIndex function.
export interface FindIndexPredicate<T> {
  (value: T): boolean
}

/**
 * ### findIndex
 * findIndex accepts three arguments:
 * 1. The array to be traversed.
 * 2. An iteratee function.
 * 3. The index from where we should start traversing the array.
 *
 * ## Examples
 * _.findIndex([4, 6, 8, 10], () => false) => -1
 * _.findIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findIndex([4, 6, 6, 8, 10], value => value === 6, 2) => 2
 *
 */
export function findIndex<T>(collection: T[], predicate: FindIndexPredicate<T>, startIndex: number = 0): number {
  for (let i = startIndex; i < collection.length; i++) {
    if (predicate(collection[i])) {
      return i;
    }
  }

  return -1;
}

/**
 * ### findLastIndex
 * findLastIndex works line findIndex, but traverses the collection backwards.
 * The third argument is the index from where we start traversing the array.
 *
 * ## Examples
 * _.findLastIndex([4, 6, 8, 10], () => false) => -1
 * _.findLastIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findLastIndex([4, 6, 8, 6, 10], value => value === 6) => 3
 * _.findLastIndex([4, 6, 6, 8, 10], value => value === 6, 1) => 1
 *
 */
export function findLastIndex<T>(collection:T[], predicate: FindIndexPredicate<T>, maybeStartIndex?:number) : number {
  const startIndex = maybeStartIndex ?? collection.length - 1;

  for (let i = startIndex; i >= 0; i--) {
    if (predicate(collection[i])) {
      return i;
    }
  }

  return -1;
}

/**
 * ### nth
 * Given an array, should return the nth item of the passed in array.
 *
 * ## Examples
 * _.nth<number>([1, 2, 3], 0) => 1
 * _.nth<number>([1, 2, 3], 1) => 2
 * _.nth<number>([1, 2, 3], 2) => 3
 * _.nth<number>([1, 2, 3]) => 1
 *
 */
export function nth<T>(collection: T[], index: number = 0): T {
  return collection[index];
}

/**
 * ### zip
 *
 * ## Examples
 * // We can also use something called "union types" here.
 * _.zip<string | number | boolean>(["a", "b"], [1, 2], [true, false]) => [["a", 1, true], ["b", 2, false]]
 */
export function zip<T>(...collections: Array<T[]>): T[][] {
  const groups: T[][] = [];

  for (let i = 0; i < collections.length;i++) {
      const coll = collections[i];
      coll.forEach((val:T, idx:number)=>{
        groups[idx] = groups[idx] ?? [];
        groups[idx].push(val)
      })
  }

  return groups;
}
