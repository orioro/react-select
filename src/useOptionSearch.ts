import { useMemo, useState } from 'react'
import { Option, FnValueToString } from './types'
import { defaultValueToString } from './util'
import slugify from '@sindresorhus/slugify'

export const optionsSearcher =
  ({
    valueToString = defaultValueToString,
    prepareString = slugify,
  }: {
    valueToString?: FnValueToString
    prepareString?: (input: string) => string
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
