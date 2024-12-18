// Wow! You're fast! If you've reached this lesson, it's time for some more
// Lodash magic!
// Obviously Lodash has much more functions than we worked on so far, so now
// it's your turn to implement a couple more non-trivial examples.
// It's helpful to keep the [Lodash Docs](https://lodash.com/docs/4.16.4) at
// hand in case you get confused about how certain corner cases should be
// handled.

// ### join
// Converts all elements in array into a string separated by separator.
export function join<T>(collection: T[], separator: string = ',') {
  let accumulatedString = ``;
  for (let i = 0; i < collection.length; i++) {
    accumulatedString = `${accumulatedString}${collection[i]}${i < collection.length - 1 ? separator : ''}`
  }
  return accumulatedString;
}

// ### ary
// ary creates a new function. The returned function invokes func - first
// argument - with n - second argument - arguments, discarding any superfluous
// arguments.
export function ary<F extends (...args: any[]) => any> (f: F, limit: number = Infinity) {
  return function (...args: Parameters<F>): ReturnType<F> {
    const relevantArgs = args.slice(0, limit) as Parameters<F>;
    return f.apply(f, relevantArgs)
  }
}
