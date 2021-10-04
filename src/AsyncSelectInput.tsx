import React, { useState } from 'react'

import { useAsync } from 'react-use'

import { AsyncSelectInputProps, Option } from './types'

import { useAsyncOptions } from './useAsyncOptions'

import { Select } from './Select'
import { LoadingIndicator } from './LoadingIndicator'

const DEFAULT_LOADING_MESSAGE = <LoadingIndicator message='Loading' />

export function AsyncSelectInput<ValueType = any>({
  value,
  onSetValue,
  resolveInitialSelectedOption,
  searchOptions,
  noOptionsMessage,
  loadingMessage = DEFAULT_LOADING_MESSAGE,
  ...props
}: AsyncSelectInputProps): React.ReactElement {
  const [selectedOption, setSelectedOption] =
    useState<Option<ValueType> | null>(null)
  const initialSelectedOptionPromise = useAsync(async () => {
    if (resolveInitialSelectedOption === null) {
      await Promise.resolve()
    } else {
      await resolveInitialSelectedOption().then((initialSelectedOption) =>
        setSelectedOption(initialSelectedOption)
      )
    }
  }, [])

  const [asyncOptionsProps] = useAsyncOptions({
    searchOptions,
    loadingMessage,
    noOptionsMessage,
  })

  return (
    <>
      {initialSelectedOptionPromise.loading ? (
        loadingMessage
      ) : (
        <Select
          selectedOption={selectedOption}
          onSelectOption={(nextSelectedOption) => {
            setSelectedOption(nextSelectedOption)
            onSetValue(
              nextSelectedOption === null ? null : nextSelectedOption.value
            )
          }}
          {...asyncOptionsProps}
          {...props}
        />
      )}
    </>
  )
}
