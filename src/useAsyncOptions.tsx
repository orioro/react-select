import { ReactNode, useMemo } from 'react'
import { useLatest } from 'react-use'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import { Option } from './types'
import { LoadingIndicator } from './LoadingIndicator'

import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

const DEFAULT_LOADING_MESSAGE = <LoadingIndicator message='Loading options' />

type FnSearchOptions = (searchText: string) => Promise<Option[]>

class LoadOptionsError extends Error {
  constructor(sourceSearchText: string, sourceError: Error) {
    super(sourceError.message)

    this.sourceSearchText = sourceSearchText
    this.sourceError = sourceError
  }

  sourceSearchText: string
  sourceError: Error
}

const _wrapLoadOptions =
  (searchOptions: FnSearchOptions) =>
  (
    searchText: string
  ): Promise<{ sourceSearchText: string; options: Option[] }> =>
    searchOptions(searchText).then(
      (options) => ({
        sourceSearchText: searchText,
        options,
      }),
      (err) => {
        throw new LoadOptionsError(searchText, err)
      }
    )

const useDebouncedLoadOptions = ({
  searchText,
  searchOptions,
  delay = 500,
}: {
  searchText: string
  searchOptions: FnSearchOptions
  delay?: number
}) => {
  const [error, setError] = useState<null | Error>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([] as Option[])

  const _searchStart = () => {
    setIsLoading(true)
    setOptions([])
  }

  useEffect(() => {
    _searchStart()
  }, [searchText])

  //
  // Use ref to keep track of current search text.
  // Whenever a searchOptions call returns, compare the sourceSearchText
  // with the currentSearchText to determine whether options should be set.
  //
  // Handles concurrency cases when a previous search response arrives after
  // the searchText itself has changed.
  //
  const latestSearchTextRef = useLatest<string>(searchText)
  const _searchOptions = useMemo(
    () => _wrapLoadOptions(searchOptions),
    [searchOptions]
  )

  useDebounce(
    () => {
      _searchStart()

      _searchOptions(searchText).then(
        (result) => {
          if (result.sourceSearchText === latestSearchTextRef.current) {
            setIsLoading(false)
            setOptions(result.options)
            setError(null)
          }
        },
        (err) => {
          if (err.sourceSearchText === latestSearchTextRef.current) {
            setIsLoading(false)
            setError(err.sourceError)
          }
        }
      )
    },
    delay,
    [searchText, _searchOptions]
  )

  return {
    error,
    isLoading,
    options,
  }
}

export const useAsyncOptions = ({
  searchOptions,
  delay,
  noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
  loadingMessage = DEFAULT_LOADING_MESSAGE,
}: {
  searchOptions: FnSearchOptions
  delay?: number
  noOptionsMessage?: ReactNode
  loadingMessage?: ReactNode
}) => {
  const [searchText, setSearchText] = useState<string>('')

  const { error, isLoading, options } = useDebouncedLoadOptions({
    searchText,
    delay,
    searchOptions,
  })

  return [
    {
      options,
      onSearchTextChange: setSearchText,
      info: isLoading
        ? loadingMessage
        : error
        ? error.message
        : options.length === 0
        ? noOptionsMessage
        : null,
    },
    {
      isLoading,
      error,
    },
  ]
}
