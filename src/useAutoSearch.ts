import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { FnOnSearchTextChange, FnValueToString } from './types'
import { defaultValueToString } from './util'
import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

type FnPrepareString = (str: string) => string

const defaultPrepareString: FnPrepareString = (str) => str.toLowerCase()

type optionsSearcher = <OptionType = any>(conf: {
  valueToString?: FnValueToString<OptionType>
  prepareString?: FnPrepareString
}) => (options: OptionType[], searchText: string) => OptionType[]

export const optionsSearcher: optionsSearcher =
  ({
    valueToString = defaultValueToString,
    prepareString = defaultPrepareString,
  } = {}) =>
  (options, searchText) =>
    searchText
      ? options.filter((option) =>
          prepareString(valueToString(option)).includes(
            prepareString(searchText)
          )
        )
      : options

type useAutoSearch = <OptionType>(props: {
  options: OptionType[]
  search: (options: OptionType[], searchText: string) => OptionType[]
  noOptionsMessage?: ReactNode
}) => {
  options: OptionType[]
  info: ReactNode | null
  onSearchTextChange: FnOnSearchTextChange
}

export const useAutoSearch: useAutoSearch = ({
  options,
  search,
  noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
}) => {
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
