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
  title: 'Select / Styles',
  component: Select,
}

const SyncTemplate = ({
  initialSelectedOption = null,
  options,
  ...props
}: {
  label: string
  [key: string]: any
}) => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)

  const props_: SelectProps = {
    ...props,
    ...useAutoSearch({
      options,
      search: optionsSearcher(),
    }),
    selectedOption,
    onSelectOption: (option) => setSelectedOption(option),
  } as SelectProps

  return (
    <>
      <Select placeholder='Digite para buscar' {...props_} />
      <Debug data={{ selectedOption }} />
    </>
  )
}

export const StyleComposition = () => {
  const options = ESTADOS.map((e) => ({
    label: estadoToString(e),
    value: e.sigla,
  }))

  return (
    <SyncTemplate
      label='Estado'
      options={options}
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
}

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
