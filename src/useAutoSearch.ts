import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { FnOnSearchTextChange, Option } from './types'
import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

type FnPrepareString = (str: string) => string
type FnSearchOptions<ValueType = any> = (
  options: Option<ValueType>[],
  searchText: string
) => Option<ValueType>[]

const defaultPrepareString: FnPrepareString = (str) => str.toLowerCase()

export function optionsSearcher<ValueType = any>({
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

export function useAutoSearch<ValueType = any>({
  options,
  search,
  noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
}: {
  options: Option<ValueType>[]
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
