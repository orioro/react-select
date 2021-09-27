import { Story } from '@storybook/react'
import React, { useState } from 'react'
import BR_ESTADOS_E_CIDADES from '../fixtures/brasil-estados-e-cidades'

import { MenuOptionStyle } from './MenuOption'
import { TextInputStyle } from './TextInput'
import { Select, ContainerStyle } from './Select'
import { SelectProps } from './types'
import { useAutoSearch, optionsSearcher } from './useAutoSearch'
import { composeStyles } from './composeStyles'

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

// type Cidade = {
//   estado: string
//   nome: string
// }

// // @ts-ignore
// const CIDADES: Cidade[] = BR_ESTADOS_E_CIDADES.estados.reduce(
//   // @ts-ignore
//   (acc, estado) => [
//     ...acc,
//     ...estado.cidades.map((cidade) => ({
//       estado: estado.sigla,
//       nome: cidade,
//     })),
//   ],
//   []
// )

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
    ...useAutoSearch(
      options,
      optionsSearcher({
        valueToString: props.valueToString,
      })
    ),
    value,
    onSetValue: setValue,
  } as SelectProps

  return (
    <>
      <Select {...props_} />
      <Debug data={{ value }} />
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
      label='Estado'
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
      label='Estado'
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

export const StyleComposition = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => e.nome)}
    classNames={{
      Container: composeStyles(ContainerStyle(), 'background-color: yellow'),
      TextInput: composeStyles(
        TextInputStyle({
          padding: '20px',
        }),
        (context) =>
          `> input {
            background-color: ${
              context.state.isOpen ? 'lightgreen' : 'skyblue'
            };
          }`
      ),
      MenuOption: composeStyles(
        'background-color: #efefef',
        MenuOptionStyle({
          highlightStyle: {
            backgroundColor: 'lightyellow',
          },
        })
      ),
    }}
  />
)

export const StyleStaticClassNameOverride = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => e.nome)}
    classNames={{
      Container: 'Container',
    }}
  />
)

export const NoOptions = () => (
  <SyncTemplate label='Estado' options={[]} message='Não há opções' />
)
