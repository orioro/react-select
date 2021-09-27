import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Option, FnValueToString } from './types'
import { defaultValueToString } from './util'
import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

type FnPrepareString = (str: string) => string

const defaultPrepareString: FnPrepareString = (str) => str.toLowerCase()

export const optionsSearcher =
  ({
    valueToString = defaultValueToString,
    prepareString = defaultPrepareString,
  }: {
    valueToString?: FnValueToString
    prepareString?: FnPrepareString
  } = {}) =>
  (options: Option[], searchText: string): Option[] =>
    searchText
      ? options.filter((option) =>
          prepareString(valueToString(option)).includes(
            prepareString(searchText)
          )
        )
      : options

export const useAutoSearch = (
  options: Option[],
  search: (options: Option[], searchText: string) => Option[],
  noOptionsMessage: ReactNode = DEFAULT_NO_OPTIONS_MESSAGE
) => {
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
