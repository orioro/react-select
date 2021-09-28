import React, { useState } from 'react'
import { MultiSelectProps } from './types'
import { MultiSelect } from './MultiSelect'
import { useAutoSearch, optionsSearcher } from './useAutoSearch'
import { Estado, ESTADOS, Debug } from '../test/util'

export default {
  title: 'MultiSelect / Sync',
  component: MultiSelect,
}

const estadoValueToString = (estado: Estado | null) =>
  estado ? `${estado.nome} (${estado.sigla})` : ''

const SyncTemplate = ({
  initialValue = [],
  options,
  ...props
}: Partial<MultiSelectProps> & { initialValue?: any[]; options: any[] }) => {
  const [value, setValue] = useState<any[]>(initialValue)

  return (
    <>
      <MultiSelect
        label='Estados'
        value={value}
        onSetValue={setValue}
        {...useAutoSearch({
          options,
          search: optionsSearcher({
            valueToString: props.valueToString,
          }),
        })}
        {...props}
      />
      <Debug
        data={{
          value,
        }}
      />
    </>
  )
}

export const TextOptions = () => (
  <SyncTemplate options={ESTADOS.map(estadoValueToString)} />
)

export const TextOptionsWithInitialValue = () => (
  <SyncTemplate
    options={ESTADOS.map(estadoValueToString)}
    initialValue={ESTADOS.slice(10, 20).map(estadoValueToString)}
  />
)

export const ObjectOptions = () => (
  <SyncTemplate options={ESTADOS} valueToString={estadoValueToString} />
)
export const ObjectOptionsWithInitialValue = () => (
  <SyncTemplate
    options={ESTADOS}
    initialValue={ESTADOS.slice(10, 20)}
    valueToString={estadoValueToString}
  />
)

const siglaToEstadoLabel = (sigla: string | null) => {
  const estado = sigla && ESTADOS.find((estado) => estado.sigla === sigla)

  return estado ? estado.nome : ''
}

export const NormalizedOptions = () => (
  <SyncTemplate
    options={ESTADOS.map((estado) => estado.sigla)}
    valueToString={siglaToEstadoLabel}
  />
)

export const NormalizedOptionsWithInitialValue = () => (
  <SyncTemplate
    options={ESTADOS.map((estado) => estado.sigla)}
    valueToString={siglaToEstadoLabel}
    initialValue={ESTADOS.slice(10, 20).map((estado) => estado.sigla)}
  />
)
