import type { ReactNode } from 'react'
import { Option } from './common'
import { SelectProps } from './Select'

export type FnAsyncResolveInitialSelectedOption<ValueType = any> =
  () => Promise<Option<ValueType>>

export type AsyncSelectInputProps<ValueType = any> = Omit<
  SelectProps<ValueType>,
  | 'selectedOption'
  | 'onSelectOption'
  | 'info'
  | 'onSearchTextChange'
  | 'options'
> & {
  value: ValueType | null
  onSetValue: (nextValue: ValueType | null) => void
  resolveInitialSelectedOption: FnAsyncResolveInitialSelectedOption
  searchOptions: (searchText: string) => Promise<Option<ValueType>[]>
  noOptionsMessage?: ReactNode
  loadingMessage?: ReactNode
}
