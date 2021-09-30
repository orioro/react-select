import { Story } from '@storybook/react'
import React, { useState } from 'react'

import { MenuOptionStyle } from './MenuOption'
import { TextInputStyle } from './TextInput'
import { Select, SelectStyle } from './Select'
import { SelectProps, SelectContext } from './types'
import { useAutoSearch, optionsSearcher } from './useAutoSearch'
import { composeStyles } from './composeStyles'

import './Select.stories.css'

import { ESTADOS, Debug, estadoToString } from '../test/util'

export default {
  title: 'Select / Sync',
  component: Select,
}

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
    ...useAutoSearch({
      options,
      search: optionsSearcher(),
    }),
    value,
    onSetValue: setValue,
  } as SelectProps

  return (
    <>
      <Select placeholder='Digite para buscar' {...props_} />
      <Debug data={{ value }} />
    </>
  )
}

export const TextOptionValue = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => ({
      label: estadoToString(e),
      value: e.sigla,
    }))}
  />
)
export const TextOptionValueWithInitialValue = () => (
  <SyncTemplate
    label='Estado'
    options={ESTADOS.map((e) => ({
      label: estadoToString(e),
      value: e.sigla,
    }))}
    initialValue={ESTADOS[8].sigla}
  />
)

const ObjectOptionValueTemplate: Story = (props) => {
  return (
    <SyncTemplate
      {...props}
      label='Estado'
      options={ESTADOS.map((estado) => ({
        label: estadoToString(estado),
        value: estado,
      }))}
    />
  )
}

export const ObjectOptionValue = () => <ObjectOptionValueTemplate />
export const ObjectOptionValueWithInitialValue = () => (
  <ObjectOptionValueTemplate initialValue={ESTADOS[4]} />
)

const NormalizedOptionsTemplate: Story = (props) => {
  const siglas = ESTADOS.map((option) => option.sigla)

  return (
    <SyncTemplate
      {...props}
      label='Estado'
      options={ESTADOS.map((estado) => ({
        label: estadoToString(estado),
        value: estado.sigla,
      }))}
      // valueToString={(value: any) => {
      //   return value
      //     ? ESTADOS.find((option) => option.sigla === value)?.nome
      //     : ''
      // }}
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
    options={ESTADOS.map((e) => ({
      label: estadoToString(e),
      value: e.nome,
    }))}
    classNames={{
      Container: composeStyles<SelectContext>(
        SelectStyle(),
        'background-color: yellow'
      ),
      TextInput: composeStyles<SelectContext>(
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
    options={ESTADOS.map((e) => ({
      label: estadoToString(e),
      value: e.sigla,
    }))}
    classNames={{
      Select: 'SomeGlobalSelector',
    }}
  />
)

export const NoOptions = () => (
  <SyncTemplate label='Estado' options={[]} message='Não há opções' />
)
