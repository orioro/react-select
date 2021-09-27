import React, { useMemo } from 'react'
import { css } from '@emotion/css'
import { useCombobox } from 'downshift'

import { Label, LabelStyle } from './Label'
import { Combobox, ComboboxStyle } from './Combobox'
import { TextInput, TextInputStyle } from './TextInput'
import { ToggleMenuButton, ToggleMenuButtonStyle } from './ToggleMenuButton'
import { Menu, MenuStyle } from './Menu'
import { MenuOption, MenuOptionStyle } from './MenuOption'
import { InfoBox, InfoBoxStyle } from './InfoBox'

import { defaultValueToString, applyIfFunction } from './util'

import {
  SelectProps,
  SelectComponents,
  ComponentStyleSpec,
  SelectComponentStyleSpecs,
} from './types'

type AnyObject = {
  [key: string]: any
}

const stateReducer = (
  _state: AnyObject,
  { changes, type }: { changes: AnyObject; type: string }
) => {
  switch (type) {
    // Reset inputValue whenever user selects item
    // either through enter keydown or mouse click
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:

    // Prevent searchText/inputValue from initializing with the full value
    case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:

    // Prevent searchText/inputValue from having an incomplete value (set it to '' on blur)
    case useCombobox.stateChangeTypes.InputBlur:
    case useCombobox.stateChangeTypes.InputKeyDownEscape:
    case useCombobox.stateChangeTypes.ToggleButtonClick:
      // case useCombobox.stateChangeTypes.FunctionCloseMenu:
      // case useCombobox.stateChangeTypes.FunctionSelectItem:
      return {
        ...changes,
        inputValue: '', // don't add the item string as input value at selection.
      }
    default:
      return changes
  }
}

export const ContainerStyle = (): ComponentStyleSpec =>
  css(`
    display: inline-flex;
    flex-direction: column;
    position: relative;
  `)

const defaultComponents: SelectComponents = {
  Label,
  Combobox,
  TextInput,
  ToggleMenuButton,
  Menu,
  MenuOption,
  InfoBox,
}

const defaultClassNames = {
  Container: ContainerStyle(),
  Label: LabelStyle(),
  Combobox: ComboboxStyle(),
  TextInput: TextInputStyle(),
  ToggleMenuButton: ToggleMenuButtonStyle(),
  Menu: MenuStyle(),
  MenuOption: MenuOptionStyle(),
  InfoBox: InfoBoxStyle(),
}

export const Select = ({
  label,
  info,
  options,
  valueToString = defaultValueToString,

  value,
  onSetValue,

  onSearchTextChange,

  components = {},
  classNames = {},
}: SelectProps): React.ReactElement => {
  const _components: SelectComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components]
  )

  const _classNames: SelectComponentStyleSpecs = useMemo(
    () => ({
      ...defaultClassNames,
      ...classNames,
    }),
    [classNames]
  )

  const {
    // Prop getters
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,

    // State
    isOpen,
    highlightedIndex,
    inputValue: searchText,

    // Functions
    openMenu,
  } = useCombobox({
    stateReducer,

    items: options,
    itemToString: valueToString,

    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => onSetValue(selectedItem),

    onInputValueChange: ({ inputValue }) =>
      onSearchTextChange(inputValue ? inputValue : ''),
  })

  const selectContext = {
    valueToString,
    state: useMemo(
      () => ({
        isOpen,
        highlightedIndex,
        searchText,
        value,
        options,
      }),
      [isOpen, highlightedIndex, searchText, value, options]
    ),
  }

  return (
    <div className={applyIfFunction(_classNames.Container, selectContext)}>
      <_components.Label
        {...selectContext}
        className={applyIfFunction(_classNames.Label, selectContext)}
        labelProps={getLabelProps()}
      >
        {label}
      </_components.Label>
      <_components.Combobox
        {...selectContext}
        className={applyIfFunction(_classNames.Combobox, selectContext)}
        comboboxProps={getComboboxProps()}
      >
        <_components.TextInput
          {...selectContext}
          className={applyIfFunction(_classNames.TextInput, selectContext)}
          inputProps={getInputProps({
            onFocus: () => {
              if (!isOpen) {
                openMenu()
              }
            },
          })}
        />

        <_components.ToggleMenuButton
          {...selectContext}
          className={applyIfFunction(
            selectContext,
            _classNames.ToggleMenuButton
          )}
          buttonProps={getToggleButtonProps()}
        >
          &#9662;
        </_components.ToggleMenuButton>
      </_components.Combobox>
      <_components.Menu
        className={applyIfFunction(_classNames.Menu, selectContext)}
        menuProps={getMenuProps()}
        getOptionDomProps={getItemProps}
        renderOption={({ option, index }) => {
          const menuOptionContext = {
            ...selectContext,
            option,
            index,
            isHighlighted: highlightedIndex === index,
          }

          return (
            <_components.MenuOption
              {...menuOptionContext}
              className={applyIfFunction(
                _classNames.MenuOption,
                menuOptionContext
              )}
            />
          )
        }}
        {...selectContext}
      />
      {info && (
        <_components.InfoBox
          className={applyIfFunction(_classNames.InfoBox, selectContext)}
        >
          {info}
        </_components.InfoBox>
      )}
    </div>
  )
}
