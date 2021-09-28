import { FnValueToString } from './types'

export const defaultValueToString: FnValueToString = (item) =>
  item ? item : ''

type applyIfFunction = <Args extends any[], ReturnType>(
  fnOrValue: ((...args: Args) => ReturnType) | any,
  ...args: Args
) => ReturnType

export const applyIfFunction: applyIfFunction = (fnOrValue, ...args) =>
  typeof fnOrValue === 'function' ? fnOrValue(...args) : fnOrValue
