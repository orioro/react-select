import type { ReactNode } from 'react'
import type { SelectProps } from './Select'

export type SelectInputProps<ValueType = any> = Omit<
  SelectProps<ValueType>,
  'selectedOption' | 'onSelectOption' | 'info' | 'onSearchTextChange'
> & {
  value: ValueType | null
  onSetValue: (nextValue: ValueType | null) => void
  noOptionsMessage?: ReactNode
}
