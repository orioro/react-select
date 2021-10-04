import { useDebounce } from 'react-use'
import { useQuery, QueryClientProvider, QueryClient } from 'react-query'

import { LoadingIndicator } from './LoadingIndicator'

import { Select } from './Select'
import {
  _simulateAsync,
  CIDADES,
  Debug,
  searchCidades,
  cidadeToString,
} from '../test/util'
import { useState } from 'react'

export default {
  title: 'Select / Async',
  component: Select,
}

// Create a client
const queryClient = new QueryClient()

const MAX_RESULT_COUNT = 100

const asyncSearchCidades = _simulateAsync((searchText) =>
  searchCidades(searchText).slice(0, MAX_RESULT_COUNT)
)

const asyncGetCidadeByCode = _simulateAsync((code) => {
  console.log('asyncGetCidadeByCode', code)

  const cidade = CIDADES.find((cidade) => cidade.code === code)

  return cidade || null
})

const useDebouncedState = (initialState, delay = 500) => {
  const [liveState, setLiveState] = useState(initialState)
  const [debouncedState, setDebouncedState] = useState(liveState)

  useDebounce(() => setDebouncedState(liveState), delay, [liveState])

  return [debouncedState, setLiveState, liveState]
}

const Template = () => {
  const [debouncedSearchText, setSearchText, liveSearchText] =
    useDebouncedState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const searchOptionsQuery = useQuery([debouncedSearchText], () => {
    console.log(`searchOptionsQuery ${debouncedSearchText}`)

    return asyncSearchCidades(debouncedSearchText).then((cidades) => {
      return cidades.map((cidade) => ({
        label: cidadeToString(cidade),
        value: cidade.code,
      }))
    })
  })

  const initialSelectedOptionQuery = useQuery(['cod_sãopaulo'], () => {
    console.log('initialSelectedOptionQuery')
    return asyncGetCidadeByCode('cod_sãopaulo').then((initialCidade) =>
      setSelectedOption({
        label: cidadeToString(initialCidade),
        value: initialCidade.code,
      })
    )
  })

  return (
    <>
      <Select
        label='Cidade'
        options={
          liveSearchText !== debouncedSearchText
            ? []
            : searchOptionsQuery.status === 'success'
            ? searchOptionsQuery.data
            : []
        }
        selectedOption={selectedOption}
        onSelectOption={(option) => setSelectedOption(option)}
        onSearchTextChange={(newSearchText) => setSearchText(newSearchText)}
        info={
          liveSearchText !== debouncedSearchText ||
          searchOptionsQuery.status === 'loading' ? (
            <LoadingIndicator message='Carregando' />
          ) : null
        }
      />
      <Debug
        data={{
          selectedOption,
          initialSelectedOptionQueryStatus: initialSelectedOptionQuery.status,
          searchOptionsQueryStatus: searchOptionsQuery.status,
          optionCount:
            searchOptionsQuery.status === 'success'
              ? searchOptionsQuery.data.length
              : null,
        }}
      />
    </>
  )
}

export function Example() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Template />
      </QueryClientProvider>
    </>
  )
}
