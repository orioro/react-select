import { AsyncSelectInput } from './AsyncSelectInput'
import {
  CIDADES,
  Debug,
  cidadeToString,
  _simulateAsync,
  searchCidades,
} from '../test/util'
import { useState } from 'react'

export default {
  title: 'AsyncSelectInput',
  component: AsyncSelectInput,
}

const MAX_RESULT_COUNT = 100

const asyncSearchCidades = _simulateAsync((searchText) =>
  searchCidades(searchText).slice(0, MAX_RESULT_COUNT)
)

const asyncGetCidadeByCode = _simulateAsync((code) => {
  const cidade = CIDADES.find((cidade) => cidade.code === code)

  return cidade || null
})

const cidadeToOption = (cidade) => ({
  label: cidadeToString(cidade),
  value: cidade.code,
})

const Template = ({ initialValue = null } = {}) => {
  const [value, setValue] = useState(initialValue)

  return (
    <>
      <AsyncSelectInput
        label='Cidade'
        resolveInitialSelectedOption={() =>
          value === null
            ? null
            : asyncGetCidadeByCode(value).then((cidade) =>
                cidadeToOption(cidade)
              )
        }
        searchOptions={(searchText) =>
          asyncSearchCidades(searchText).then((cidades) =>
            cidades.map((cidade) => cidadeToOption(cidade))
          )
        }
        value={value}
        onSetValue={setValue}
      />
      <Debug data={{ value }} />
    </>
  )
}

export const NoInitialValue = () => <Template />
export const WithInitialValue = () => (
  <Template initialValue={CIDADES[10].code} />
)
