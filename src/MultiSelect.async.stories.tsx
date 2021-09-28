import React, { useState, useMemo, useEffect } from 'react'
import {
  CIDADES,
  cidadeToString,
  Debug,
  searchCidades,
  _simulateAsync,
} from '../test/util'
import { MultiSelect } from './MultiSelect'
import { useAsyncOptions } from './useAsyncOptions'

export default {
  title: 'MultiSelect / Async',
  component: MultiSelect,
}

const MAX_OPTION_LENGTH = 100

const asyncSearchCidades = _simulateAsync((searchText: string) =>
  searchCidades(searchText).slice(0, MAX_OPTION_LENGTH)
)

type AsyncTemplateProps = {
  initialValue?: any[]
  searchOptions: (searchText: string) => Promise<any[]>
  debug?: any
  [key: string]: any
}

const AsyncTemplate = ({
  initialValue = [],
  searchOptions,
  debug = {},
  ...props
}: AsyncTemplateProps) => {
  const [asyncOptionProps, { isLoading }] = useAsyncOptions({
    searchOptions,
  })

  const [value, setValue] = useState(initialValue)

  return (
    <>
      <MultiSelect
        label='Cidades'
        placeholder='Selecione as cidades'
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
const searchTextOptions = (searchText: string) =>
  asyncSearchCidades(searchText).then((cidades) => cidades.map(cidadeToString))

export const TextOptions = () => (
  <AsyncTemplate searchOptions={searchTextOptions} />
)

export const TextOptionsWithInitialValue = () => (
  <AsyncTemplate
    searchOptions={searchTextOptions}
    initialValue={CIDADES.slice(80, 100).map(cidadeToString)}
  />
)

export const ObjectOptions = () => (
  <AsyncTemplate
    searchOptions={asyncSearchCidades}
    valueToString={cidadeToString}
  />
)

export const ObjectOptionsWithInitialValue = () => (
  <AsyncTemplate
    searchOptions={asyncSearchCidades}
    initialValue={CIDADES.slice(70, 100)}
    valueToString={cidadeToString}
  />
)

const asyncGetLabels = _simulateAsync((values) => {
  return CIDADES.filter((cidade) => values.includes(cidade.code)).reduce(
    (acc, cidade) => ({
      ...acc,
      [cidade.code]: cidadeToString(cidade),
    }),
    {}
  )
})

const NormalizedOptionsTemplate = ({
  initialValue = [],
  ...props
}: Partial<AsyncTemplateProps> = {}) => {
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
    asyncGetLabels(initialValue).then((initialValueLabels) =>
      setLabels((current) => ({
        ...current,
        ...initialValueLabels,
      }))
    )
  }, [initialValue])

  return (
    <AsyncTemplate
      {...props}
      initialValue={initialValue}
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
  <NormalizedOptionsTemplate
    initialValue={CIDADES.slice(400, 405).map((cidade) => cidade.code)}
  />
)
