type applyIfFunction = <Args extends any[], ReturnType>(
  fnOrValue: ((...args: Args) => ReturnType) | any,
  ...args: Args
) => ReturnType

export const applyIfFunction: applyIfFunction = (fnOrValue, ...args) =>
  typeof fnOrValue === 'function' ? fnOrValue(...args) : fnOrValue
