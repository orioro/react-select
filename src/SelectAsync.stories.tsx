import React, { useState, useMemo, useEffect } from 'react'
import { Select } from './Select'
import BR_ESTADOS_E_CIDADES from '../fixtures/brasil-estados-e-cidades'
import { optionsSearcher } from './useAutoSearch'

import { useAsyncOptions } from './useAsyncOptions'

type Estado = {
  sigla: string
  nome: string
}

const ESTADOS: Estado[] = BR_ESTADOS_E_CIDADES.estados.map(
  ({ sigla, nome }) => ({
    sigla,
    nome,
  })
)

type Cidade = {
  estado: string
  nome: string
  code: string
}

// @ts-ignore
const CIDADES: Cidade[] = BR_ESTADOS_E_CIDADES.estados.reduce(
  // @ts-ignore
  (acc, estado) => [
    ...acc,
    ...estado.cidades.map((cidade) => ({
      estado: estado.sigla,
      nome: cidade,

      // Fake city "code"
      code: `cod_${cidade.toLowerCase().replace(/\s*/g, '')}`,
    })),
  ],
  []
)

export default {
  title: 'Select Async',
  component: Select,
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

const _simulateAsync =
  (fn) =>
  (...args) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(fn(...args)), getRandomInt(500, 3000))
    })

const cidadeToString = (value) => (value ? value.nome : '')

const MAX_OPTION_LENGTH = 100

const searchCidades = _simulateAsync((searchText) =>
  optionsSearcher({
    valueToString: cidadeToString,
  })
    .bind(
      null,
      CIDADES
    )(searchText)
    .slice(0, MAX_OPTION_LENGTH)
)

const Debug = ({ data }: { data: any }) => (
  <pre>{JSON.stringify(data, null, '  ')}</pre>
)

const AsyncTemplate = ({
  initialValue = null,
  searchOptions,
  debug = {},
  ...props
}: {
  [key: string]: any
}) => {
  const [asyncOptionProps, { isLoading }] = useAsyncOptions({
    searchOptions,
  })

  const [value, setValue] = useState(initialValue)

  return (
    <>
      <Select
        label='Cidade'
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
          ...debug
        }}
      />
    </>
  )
}

/**
 * searchOptions must be memoized in order
 * not to cause unecessary re-renders
 */
const loadTextOptions = (searchText) =>
  searchCidades(searchText).then((cidades) => cidades.map(cidadeToString))

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
    <AsyncTemplate searchOptions={searchCidades} valueToString={cidadeToString} />
  )
}

export const ObjectOptionsWithInitialValue = () => {
  return (
    <AsyncTemplate
      searchOptions={searchCidades}
      valueToString={cidadeToString}
      initialValue={CIDADES[101]}
    />
  )
}

const asyncGetLabel = _simulateAsync((value) => {
  const cidade = CIDADES.find((cidade) => cidade.code === value)

  return cidade ? cidade.nome : 'Cidade inválida'
})

// const asyncGetLabel = (value) => {
//   console.log(`will load ${value}`)

//   return _simulateAsync(() => {
//     const cidade = CIDADES.find((cidade) => cidade.code === value)

//     return cidade ? cidade.nome : 'Cidade inválida'
//   })().then((result) => {
//     console.log(`did load ${value}: ${result}`)

//     return result
//   })
// }

const NormalizedOptionsTemplate = (props) => {
  //
  // Scenario: the label must be loaded asynchronously
  //
  const [labels, setLabels] = useState<{ [key: string]: string }>({})

  const searchOptions = useMemo(
    () => (searchText: string) =>
      searchCidades(searchText).then((cidades) => {
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
      valueToString={(value) => labels[value] || 'Carregando...'}
      debug={{
        labels
      }}
    />
  )
}

export const NormalizedOptions = () => <NormalizedOptionsTemplate />
export const NormalizedOptionsWithInitialValue = () => (
  <NormalizedOptionsTemplate initialValue={CIDADES[200].code} />
)
