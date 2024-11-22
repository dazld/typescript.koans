// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Collection functions

export interface Dictionary<T> {
  [index: string]: T;
}

interface ArrayForEachIteratee<T> {
  (value?: T,
   index?: number,
   collection?: Array<T>): any;
}

interface DictionaryForEachIteratee<T> {
  (value?: T,
   key?: string,
   collection?: Dictionary<T>): any;
}

/**
 * ### forEach
 * should iterate over all items of array or all properties of an object
 *
 * ## Examples
 *
 *  let collection = ["first", "second", "third"];
 *  let result = [];
 *  let iteratee = (value, index, collection) => result[index] = [index, value];
 *
 *  _.forEach(collection, iteratee); => result === [[0, 'first'], [1, 'second'], [2, 'thidrd']];
 *
 *  collection = {
 *    "0": "first",
 *    "1": "second",
 *    "2": "third"
 *  };
 *  result = [];
 *  iteratee = (value, index, collection) => result[index] = [index, value];
 *
 *  _.forEach(collection, iteratee); => result === [['0', 'first'], ['1', 'second'], ['2', 'thidrd']];
 *
 */
export function forEach<T>(collection:Dictionary<T>, iteratee: DictionaryForEachIteratee<T>): void
export function forEach<T>(collection:T[], iteratee: ArrayForEachIteratee<T>): void

export function forEach<T>(
  collection: T[] | Dictionary<T>,
  iteratee: ArrayForEachIteratee<T> | DictionaryForEachIteratee<T>
): void {

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i ++) {
      (iteratee as ArrayForEachIteratee<T>)(collection[i], i, collection)
    }
  } else {
    for (let k in collection) {
      (iteratee as DictionaryForEachIteratee<T>)(collection[k], k, collection)
    }
  }


}

interface ArrayEveryIteratee<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}

interface DictionaryEveryIteratee<T> {
  (value?: T,
   key?: string,
   collection?: Dictionary<T>): boolean;
}


/**
 * ### every
 *
 * checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey.
 * returns true if all elements pass the predicate check, else false.
 *  Note: This method returns true for empty collections because everything is true of elements of empty collections.
 *
 * ## Examples
 *
 *  _.every([true, 1, null, 'yes'], Boolean); => false
 *  _.every([null, null, null], (value, index, collection) => value === null); => true
 */
export function every<T>(collection: Dictionary<T>, iteratee: DictionaryEveryIteratee<T>): boolean
export function every<T>(collection: T[], iteratee: ArrayEveryIteratee<T>): boolean
export function every<T>(
  collection: T[] | Dictionary<T>, 
  iteratee: ArrayEveryIteratee<T> | DictionaryEveryIteratee<T>
): boolean {
  if (Array.isArray(collection)) {
    for (let i = 0; i< collection.length; i++) {
      if ((iteratee as ArrayEveryIteratee<T>)(collection[i], i, collection) === false) {
        return false
      }
    }
  } else {
    for (let k in collection) {
      if ((iteratee as DictionaryEveryIteratee<T>)(collection[k], k, collection) === false) {
        return false
      }
    }
  }

  return true;
}

/**
 * ### filter
 *   iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 *
 * ## Examples
 *
 *  let collection = [1, 2, 3, 4, 1, 2];
 *  let iteratee = x => x < 3;
 *
 *   _.filter<number>(collection, iteratee) => [1, 2, 1, 2]
 *
 *  collection: _.Dictionary<number> = {
 *    'a': 1,
 *     'b': 2,
 *    'c': 3
 *   };
 *  iteratee = (v, k) => !(v === 2 && k === 'b');
 *
 *  _.filter<number>(collection, iteratee) => { 'a': 1, 'c': 3 }
 *
 */

export interface FilterIteratee<T> {
  (value: T): boolean
}

export interface DictionaryFilterIteratee<T> {
  (value: T,
   key?: string): boolean
}


export function filter<T>(collection: T[], iteratee:FilterIteratee<T>) : T[]
export function filter<T>(collection: Dictionary<T>, iteratee: DictionaryFilterIteratee<T>): Dictionary<T>
export function filter<T>(
  collection: T[] | Dictionary<T>,
  iteratee: FilterIteratee<T> | DictionaryFilterIteratee<T>
): T[] | Dictionary<T> {
  if (Array.isArray(collection)) {
    const nextCollection: T[] = [];

    for (let i = 0; i < collection.length; i++) {
      const val = collection[i];
      if (iteratee(val)) {
        nextCollection.push(val)
      }
    }
    return nextCollection;
  } else {
    const nextCollection: Dictionary<T> = {};

    for (let k in collection) {
      const val = collection[k];
      if (iteratee(val, k)) {
        nextCollection[k] = val;
      }
    }
    return nextCollection;
  }

}

interface ArrayMapIteratee<T> {
  (value: T) : T
}

interface DictionaryMapIteratee<T> {
  (value: T, key?: string): T[]
}

/**
 * ### map
 * Creates an array of values by running each element in collection thru iteratee
 *
 * ## Examples
 *
 *  let collection = [1, 2, 3];
 *  let iteratee = x => x * 3;
 *
 *   _.map<number>(collection, iteratee) => [3, 6, 9]
 *
 *  collection: _.Dictionary<number> = {
 *    'a': 1,
 *    'b': 2
 *   };
 *  iteratee = (value, key) => [value, key];
 *
 *  _.map<number>(collection, iteratee) => [[1,'a'], [2, 'b']]
 */

export function map<T>(collection: T[], iteratee: ArrayMapIteratee<T>): T[]
export function map<T>(collection: Dictionary<T>, iteratee: DictionaryMapIteratee<T>): Dictionary<T>

export function map<T>(
  collection: T[] | Dictionary<T>,
  iteratee: ArrayMapIteratee<T> | DictionaryMapIteratee<T>
): T[] {
  if (Array.isArray(collection)) {
    const nextCollection = [];

    for (let i = 0; i < collection.length; i++) {
      nextCollection.push((iteratee as ArrayMapIteratee<T>)(collection[i]))
    }

    return nextCollection;
  } else {
    const nextCollection = [];

    for (let k in collection) {
      nextCollection.push((iteratee as DictionaryMapIteratee<T>)(collection[k], k))
    }

    return nextCollection;
  }
}

/**
 * ### reduce
 *  Reduces collection to a value which is the accumulated result of running each element in
 *  collection thru iteratee, where each successive invocation is supplied the return value of
 *  the previous. If accumulator is not given, the first element of collection is used as the
 *  initial value.
 *  The iteratee is invoked with four arguments:(accumulator, value, index|key, collection).
 *
 * ## Examples
 *
 *  _.reduce([1, 2], (sum, n) => sum + n, 0);  => 3
 *  _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function (result, value, key) {
 *      if (!result[value]) {
 *        result[value] = [];
 *      }
 *      result[value].push(key);
 *      return result;
 *    }, {}); => { '1': ['a', 'c'], '2': ['b'] }
 *
 */

interface ArrayReducer<T> {
  (accumulator: T, value: T):T
}

interface DictionaryReducer<T> {
  (accumulator: T, value: T, key?: string): T
}

export function reduce<T>(collection: T[], reducer: ArrayReducer<T>, seed: T): T
export function reduce<T>(collection: Dictionary<T>, reducer: DictionaryReducer<T>, seed: T): T

export function reduce<T>(
  collection: T[] | Dictionary<T>,
  reducer: ArrayReducer<T> | DictionaryReducer<T>,
  seed: T
): T {

  let toReturn = seed;

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      toReturn = reducer(toReturn, collection[i]);
    }

  } else {
    for (let k in collection) {
      toReturn = reducer(toReturn, collection[k], k)
    }
  }

  return toReturn;
}
