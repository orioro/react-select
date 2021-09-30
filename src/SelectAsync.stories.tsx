import React, { useState, useMemo, useEffect } from 'react'
import { Select } from './Select'
import {
  _simulateAsync,
  CIDADES,
  Debug,
  searchCidades,
  cidadeToString,
} from '../test/util'
import { uniq } from 'lodash'

import { useAsyncOptions } from './useAsyncOptions'

export default {
  title: 'Select / Async',
  component: Select,
}

const MAX_OPTION_LENGTH = 100

const asyncFilterCidades = _simulateAsync((criteria) =>
  CIDADES.filter((cidade) => criteria(cidade))
)

const asyncLoadTextOptions = _simulateAsync(
  ({
    searchText,
    currentValue,
  }: {
    searchText: string
    currentValue: string
  }) => {

    // console.log('asyncLoadTextOptions', {
    //   searchText,
    //   currentValue
    // })

    const searchResult = searchCidades(searchText).slice(0, MAX_OPTION_LENGTH)
    const currentValueResult = CIDADES.find(
      (cidade) => cidadeToString(cidade) === currentValue
    )

    return uniq([currentValueResult, ...searchResult]).map((cidade) => ({
      label: cidadeToString(cidade),
      value: cidadeToString(cidade),
    }))
  }
)

export const Example = () => {
  const [value, setValue] = useState('Rio de Janeiro - RJ')

  const [props, { isLoading }] = useAsyncOptions({
    searchOptions: useMemo(
      () => (searchText) => {

        console.log('searchOptions', ({
          searchText,
          currentValue: value,
        }))

        return asyncLoadTextOptions({
          searchText,
          currentValue: value,
        })
      }
        ,
      [value]
    ),
  })

  return (
    <>
      <Select
        label='Test'
        value={value}
        onSetValue={setValue}
        {...props}
      />
      <Debug
        data={{
          value,
          isLoading,
          optionCount: props.options.length,
        }}
      />
    </>
  )
}
