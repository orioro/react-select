import { Story } from '@storybook/react'
import React, { useState } from 'react'
import BR_ESTADOS_E_CIDADES from '../fixtures/brasil-estados-e-cidades'
import { Select } from './Select'
import { SelectProps } from './types'
import { useOptionSearch, optionsSearcher } from './useOptionSearch'

type Estado = {
  sigla: string
  nome: string
}

type Cidade = {
  estado: string
  nome: string
}

const ESTADOS: Estado[] = BR_ESTADOS_E_CIDADES.estados.map(
  ({ sigla, nome }) => ({
    sigla,
    nome,
  })
)

// @ts-ignore
const CIDADES: Cidade[] = BR_ESTADOS_E_CIDADES.estados.reduce(
  // @ts-ignore
  (acc, estado) => [
    ...acc,
    ...estado.cidades.map((cidade) => ({
      estado: estado.sigla,
      nome: cidade,
    })),
  ],
  []
)

export default {
  title: 'Select',
  component: Select,
}

const Debug = ({ data }: { data: any }) => (
  <pre>{JSON.stringify(data, null, '  ')}</pre>
)

const SyncTemplate = ({
  initialValue = null,
  options,
  ...props
}: {
  [key: string]: any
}) => {
  const [value, setValue] = useState(initialValue)

  const props_: SelectProps = {
    ...props,
    ...useOptionSearch(options, optionsSearcher({
      valueToString: props.valueToString
    })),
    value,
    onSetValue: setValue,
  } as SelectProps

  return (
    <>
      <Debug data={{ value }} />
      <Select {...props_} />
    </>
  )
}

export const TextOptions = () => (
  <SyncTemplate label='Estado' options={ESTADOS.map((e) => e.nome)} />
)
export const TextOptionsWithInitialValue = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => e.nome)}
    initialValue={ESTADOS[8].nome}
  />
)

const ObjectOptionsTemplate: Story = (props) => {
  return (
    <SyncTemplate
      {...props}
      label="Estado"
      options={ESTADOS}
      valueToString={(value: any) => (value ? value.nome : '')}
    />
  )
}

export const ObjectOptions = () => <ObjectOptionsTemplate />
export const ObjectOptionsWithInitialValue = () => (
  <ObjectOptionsTemplate initialValue={ESTADOS[4]} />
)

const NormalizedOptionsTemplate: Story = (props) => {
  return (
    <SyncTemplate
      {...props}
      label="Estado"
      options={ESTADOS.map((option) => option.sigla)}
      valueToString={(value: any) => {
        return value
          ? ESTADOS.find((option) => option.sigla === value)?.nome
          : ''
      }}
    />
  )
}

export const NormalizedOptions = () => <NormalizedOptionsTemplate />
export const NormalizedOptionsWithInitialValue = () => (
  <NormalizedOptionsTemplate initialValue={ESTADOS[9].sigla} />
)

export const SelectStyles = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => e.nome)}
    styles={{
      Select: {
        backgroundColor: 'yellow',
        ':hover': {
          backgroundColor: 'green'
        }
      },
      ToggleMenuButton: ({ state: { isOpen }}) => {
        return {
          backgroundColor: isOpen ? 'green' : 'transparent',
          ':hover': {
            backgroundColor: 'magenta'
          }
        }
      }
    }}
  />
)
