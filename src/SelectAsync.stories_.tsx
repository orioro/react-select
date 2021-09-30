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

// const asyncSearchCidades = _simulateAsync((searchText: string) =>
//   searchCidades(searchText).slice(0, MAX_OPTION_LENGTH)
// )

// const asyncGetCidadeByCode = _simulateAsync((code: string) => {
//   const cidade = CIDADES.find((cidade) => cidade.code === code)
//   return cidade || null
// })

type AsyncTemplate = {
  initialValue?: any
  loadOptions: ({ searchText: string, currentValue: any }) => Promise<any[]>
  debug?: any
  [key: string]: any
}

const AsyncTemplate = ({
  initialValue = null,
  loadOptions,
  debug = {},
  ...props
}: AsyncTemplate) => {
  const [value, setValue] = useState(initialValue)

  const [asyncOptionProps, { isLoading }] = useAsyncOptions({
    searchOptions: useMemo(
      () => (searchText) =>
        loadOptions({
          searchText,
          currentValue: value,
        }),
      [value, loadOptions]
    ),
  })

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
// const asyncLoadTextOptions = ({ searchText, currentValue }) =>
//   asyncFilterCidades((cidade) => {
//     const cidadeStr = cidadeToString(cidade)

//     return (
//       (searchText !== '' &&
//         cidadeStr.toLowerCase().includes(searchText.toLowerCase())) ||
//       cidadeStr === currentValue
//     )
//   }).then((cidades) =>
//     cidades.map((cidade) => ({
//       label: cidadeToString(cidade),
//       value: cidadeToString(cidade),
//     }))
//   )

const asyncLoadTextOptions = _simulateAsync(
  ({
    searchText,
    currentValue,
  }: {
    searchText: string
    currentValue: string
  }) => {
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

export const TextOptionValue = () => {
  return <AsyncTemplate loadOptions={asyncLoadTextOptions} />
}

export const TextOptionValueWithInitialValue = () => {
  return (
    <AsyncTemplate
      loadOptions={asyncLoadTextOptions}
      initialValue={cidadeToString(CIDADES[4])}
    />
  )
}

// export const ObjectOptionValue = () => {
//   return (
//     <AsyncTemplate
//       searchOptions={asyncSearchCidades}
//       valueToString={cidadeToString}
//     />
//   )
// }

// export const ObjectOptionValueWithInitialValue = () => {
//   return (
//     <AsyncTemplate
//       searchOptions={asyncSearchCidades}
//       valueToString={cidadeToString}
//       initialValue={CIDADES[101]}
//     />
//   )
// }

// const asyncGetLabel = _simulateAsync((value) => {
//   const cidade = CIDADES.find((cidade) => cidade.code === value)

//   return cidade ? cidade.nome : 'Cidade inválida'
// })

// const NormalizedOptionsTemplate = (props: Partial<AsyncTemplate> = {}) => {
//   //
//   // Scenario: the label must be loaded asynchronously
//   //
//   const [labels, setLabels] = useState<{ [key: string]: string }>({})

//   const searchOptions = useMemo(
//     () => (searchText: string) =>
//       asyncSearchCidades(searchText).then((cidades) => {
//         setLabels((currentLabels) =>
//           cidades.reduce(
//             (acc, cidade) => ({
//               ...acc,
//               [cidade.code]: cidade.nome,
//             }),
//             currentLabels
//           )
//         )

//         return cidades.map((cidade) => cidade.code)
//       }),
//     []
//   )

//   useEffect(() => {
//     asyncGetLabel(props.initialValue).then((initialValueLabel) =>
//       setLabels((current) => ({
//         ...current,
//         [props.initialValue]: initialValueLabel,
//       }))
//     )
//   }, [props.initialValue])

//   return (
//     <AsyncTemplate
//       {...props}
//       searchOptions={searchOptions}
//       valueToString={(value: string | null) =>
//         (value && labels[value]) || 'Carregando...'
//       }
//       debug={{
//         labels,
//       }}
//     />
//   )
// }

// export const NormalizedOptions = () => <NormalizedOptionsTemplate />
// export const NormalizedOptionsWithInitialValue = () => (
//   <NormalizedOptionsTemplate initialValue={CIDADES[200].code} />
// )
