import React, { useState, useMemo, useEffect } from 'react'
import { Select } from './Select'
import {
  _simulateAsync,
  CIDADES,
  Debug,
  searchCidades,
  cidadeToString,
} from '../test/util'

import { useAsyncOptions } from './useAsyncOptions'

export default {
  title: 'Select / Async',
  component: Select,
}

const MAX_OPTION_LENGTH = 100

const asyncSearchCidades = _simulateAsync((searchText: string) =>
  searchCidades(searchText).slice(0, MAX_OPTION_LENGTH)
)

type AsyncTemplate = {
  initialValue?: any
  searchOptions: (searchText: string) => Promise<any[]>
  debug?: any
  [key: string]: any
}

const AsyncTemplate = ({
  initialValue = null,
  searchOptions,
  debug = {},
  ...props
}: AsyncTemplate) => {
  const [asyncOptionProps, { isLoading }] = useAsyncOptions({
    searchOptions,
  })

  const [value, setValue] = useState(initialValue)

  return (
    <>
      <Select
        label='Cidade'
        placeholder='Digite para buscar'
        value={value}
        onSetValue={setValue}
        {...props}
        {...asyncOptionProps}
      />
      <Debug
        data={{
          value,
          isLoading,
          optionCount: asyncOptionProps.options.length,
          ...debug,
        }}
      />
    </>
  )
}

/**
 * searchOptions must be memoized in order
 * not to cause unecessary re-renders
 */
const loadTextOptions = (searchText: string) =>
  asyncSearchCidades(searchText).then((cidades) => cidades.map(cidadeToString))

export const TextOptions = () => {
  return <AsyncTemplate searchOptions={loadTextOptions} />
}

export const TextOptionsWithInitialValue = () => {
  return (
    <AsyncTemplate searchOptions={loadTextOptions} initialValue='São Paulo' />
  )
}

export const ObjectOptions = () => {
  return (
    <AsyncTemplate
      searchOptions={asyncSearchCidades}
      valueToString={cidadeToString}
    />
  )
}

export const ObjectOptionsWithInitialValue = () => {
  return (
    <AsyncTemplate
      searchOptions={asyncSearchCidades}
      valueToString={cidadeToString}
      initialValue={CIDADES[101]}
    />
  )
}

const asyncGetLabel = _simulateAsync((value) => {
  const cidade = CIDADES.find((cidade) => cidade.code === value)

  return cidade ? cidade.nome : 'Cidade inválida'
})

const NormalizedOptionsTemplate = (props: Partial<AsyncTemplate> = {}) => {
  //
  // Scenario: the label must be loaded asynchronously
  //
  const [labels, setLabels] = useState<{ [key: string]: string }>({})

  const searchOptions = useMemo(
    () => (searchText: string) =>
      asyncSearchCidades(searchText).then((cidades) => {
        setLabels((currentLabels) =>
          cidades.reduce(
            (acc, cidade) => ({
              ...acc,
              [cidade.code]: cidade.nome,
            }),
            currentLabels
          )
        )

        return cidades.map((cidade) => cidade.code)
      }),
    []
  )

  useEffect(() => {
    asyncGetLabel(props.initialValue).then((initialValueLabel) =>
      setLabels((current) => ({
        ...current,
        [props.initialValue]: initialValueLabel,
      }))
    )
  }, [props.initialValue])

  return (
    <AsyncTemplate
      {...props}
      searchOptions={searchOptions}
      valueToString={(value: string | null) =>
        (value && labels[value]) || 'Carregando...'
      }
      debug={{
        labels,
      }}
    />
  )
}

export const NormalizedOptions = () => <NormalizedOptionsTemplate />
export const NormalizedOptionsWithInitialValue = () => (
  <NormalizedOptionsTemplate initialValue={CIDADES[200].code} />
)
