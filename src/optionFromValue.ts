import { Option } from './types'

const defaultValueToString = (value: any): string =>
  value === null || value === undefined ? '' : `${value}`

export function optionFromValue<ValueType>(
  value: ValueType,
  valueToString: (value: ValueType) => string = defaultValueToString
): Option<ValueType> {
  return {
    label: valueToString(value),
    value,
  }
}

// export const prepareOption = (
//   optionOrValue: OptionShorthand | Option
// ): Option =>
//   isPlainObject(optionOrValue)
//     ? (optionOrValue as Option)
//     : {
//         label: `${optionOrValue}`,
//         value: optionOrValue,
//       }

// export const prepareOptions = (optionsOrValues: (OptionShorthand | Option)[]) =>
//   optionsOrValues.map(prepareOption)
