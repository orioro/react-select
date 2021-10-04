import { SelectInput } from './SelectInput'
import { ESTADOS, Debug, estadoToString } from '../test/util'
import { useState } from 'react'

export default {
  title: 'SelectInput (sync)',
  component: SelectInput,
}

export const Basic = () => {
  const [value, setValue] = useState(ESTADOS[10].sigla)

  return (
    <>
      <SelectInput
        label='Estado'
        options={ESTADOS.map((estado) => ({
          label: estadoToString(estado),
          value: estado.sigla,
          disabled: estado.sigla.startsWith('S'),
        }))}
        value={value}
        onSetValue={setValue}
      />
      <Debug data={{ value }} />
    </>
  )
}
