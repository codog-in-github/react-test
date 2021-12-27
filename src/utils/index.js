export const debounce = (fn, delay = 200, thisArg) => {
  let timmer
  return (...args) => {
    clearTimeout(timmer)
    timmer = setTimeout(fn.bind(thisArg), delay, ...args)
  }
}
