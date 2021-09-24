import { useMemo, useState } from 'react'
import { Option, FnValueToString } from './types'
import { defaultValueToString } from './util'

type FnPrepareString = (str: string) => string

const defaultPrepareString: FnPrepareString = (str) => str.toLowerCase()

export const optionsSearcher =
  ({
    valueToString = defaultValueToString,
    prepareString = defaultPrepareString,
  }: {
    valueToString?: FnValueToString
    prepareString?: FnPrepareString
  }) =>
  (options: Option[], searchText: string): Option[] =>
    searchText
      ? options.filter((option) =>
          prepareString(valueToString(option)).includes(
            prepareString(searchText)
          )
        )
      : options

export const useOptionSearch = (
  options: Option[],
  search: (options: Option[], searchText: string) => Option[]
) => {
  const [searchText, setSearchText] = useState('')
  const options_ = useMemo(
    () => search(options, searchText),
    [options, searchText]
  )

  return {
    options: options_,
    onSetSearchText: setSearchText,
  }
}
