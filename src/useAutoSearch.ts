import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  FnOnSearchTextChange,
  FnValueToString,
  NotUndefined,
  Option,
} from './types'
import { defaultValueToString } from './util'
import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

type FnPrepareString = (str: string) => string
type FnSearchOptions<ValueType = NotUndefined> = (
  options: Option<ValueType>[],
  searchText: string
) => Option<ValueType>[]

const defaultPrepareString: FnPrepareString = (str) => str.toLowerCase()

// type optionsSearcher = <OptionType = any>(conf: {
//   valueToString?: FnValueToString<OptionType>
//   prepareString?: FnPrepareString
// }) => (options: OptionType[], searchText: string) => OptionType[]

// export const optionsSearcher: optionsSearcher =
//   ({
//     valueToString = defaultValueToString,
//     prepareString = defaultPrepareString,
//   } = {}) =>
//   (options, searchText) =>
//     searchText
//       ? options.filter((option) =>
//           prepareString(valueToString(option)).includes(
//             prepareString(searchText)
//           )
//         )
//       : options

export function optionsSearcher<ValueType = NotUndefined>({
  prepareString = defaultPrepareString,
}: {
  prepareString?: FnPrepareString
} = {}): FnSearchOptions<ValueType> {
  return function (
    options: Option<ValueType>[],
    searchText: string
  ): Option<ValueType>[] {
    return searchText
      ? options.filter((option) =>
          prepareString(option.label).includes(prepareString(searchText))
        )
      : options
  }
}

export function useAutoSearch<ValueType = NotUndefined>({
  options,
  search,
  noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
}: {
  options: Option<ValueType>
  search: FnSearchOptions<ValueType>
  noOptionsMessage?: ReactNode
}): {
  options: Option<ValueType>[]
  info: ReactNode | null
  onSearchTextChange: FnOnSearchTextChange
} {
  const [searchText, setSearchText] = useState('')
  const options_ = useMemo(
    () => search(options, searchText),
    [options, searchText]
  )

  return {
    options: options_,
    info: options_.length === 0 ? noOptionsMessage : null,
    onSearchTextChange: setSearchText,
  }
}

// export const useAutoSearch: useAutoSearch = ({
//   options,
//   search,
//   noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
// }) => {
//   const [searchText, setSearchText] = useState('')
//   const options_ = useMemo(
//     () => search(options, searchText),
//     [options, searchText]
//   )

//   return {
//     options: options_,
//     info: options_.length === 0 ? noOptionsMessage : null,
//     onSearchTextChange: setSearchText,
//   }
// }
