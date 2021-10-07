import { ReactNode, useMemo } from 'react'
import { useLatest } from 'react-use'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import { FnOnSearchTextChange, Option } from './types'
import { LoadingIndicator } from './LoadingIndicator'

import { DEFAULT_NO_OPTIONS_MESSAGE } from './constants'

const DEFAULT_LOADING_MESSAGE = <LoadingIndicator message='Loading options' />

export type FnAsyncSearchOptions<ValueType = any> = (
  searchText: string
) => Promise<Option<ValueType>[]>

class LoadOptionsError extends Error {
  constructor(sourceSearchText: string, sourceError: Error) {
    super(sourceError.message)

    this.sourceSearchText = sourceSearchText
    this.sourceError = sourceError
  }

  sourceSearchText: string
  sourceError: Error
}

function _wrapLoadOptions<ValueType>(
  searchOptions: FnAsyncSearchOptions<ValueType>
) {
  return (
    searchText: string
  ): Promise<{ sourceSearchText: string; options: any[] }> =>
    searchOptions(searchText).then(
      (options) => ({
        sourceSearchText: searchText,
        options,
      }),
      (err) => {
        throw new LoadOptionsError(searchText, err)
      }
    )
}

function useDebouncedSearchOptions<ValueType = any>({
  searchText,
  searchOptions,
  delay = 500,
}: {
  searchText: string
  searchOptions: FnAsyncSearchOptions<ValueType>
  delay?: number
}): {
  error: Error | null
  isLoading: boolean
  options: Option<ValueType>[]
} {
  const [error, setError] = useState<null | Error>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([] as any[])

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

  // console.log({
  //   searchText,
  // })

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

export function useAsyncOptions<ValueType = any>({
  searchOptions,
  delay,
  noOptionsMessage = DEFAULT_NO_OPTIONS_MESSAGE,
  loadingMessage = DEFAULT_LOADING_MESSAGE,
}: {
  searchOptions: FnAsyncSearchOptions<ValueType>
  delay?: number
  noOptionsMessage?: ReactNode
  loadingMessage?: ReactNode
}): [
  {
    options: Option<ValueType>[]
    onSearchTextChange: FnOnSearchTextChange
    info: React.ReactNode
  },
  {
    searchText: string
    isLoading: boolean
    error: Error | null
  }
] {
  const [searchText, setSearchText] = useState<string>('')
  const { error, isLoading, options } = useDebouncedSearchOptions({
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
      searchText,
      isLoading,
      error,
    },
  ]
}
