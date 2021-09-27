import { FnValueToString } from './types'

export const defaultValueToString: FnValueToString = (item) =>
  item ? item : ''

export const applyIfFunction = <Args extends any[]>(
  fnOrValue: any,
  ...args: Args
) => (typeof fnOrValue === 'function' ? fnOrValue(...args) : fnOrValue)
