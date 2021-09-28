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
import { ClearButton, ClearButtonStyle } from './ClearButton'

import { defaultValueToString, applyIfFunction } from './util'

import {
  SelectType,
  SelectComponents,
  SelectComponentStyles,
  ComponentStyleType,
  SelectContext,
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
    case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem: // eslint-disable-line no-fallthrough

    // Prevent searchText/inputValue from having an incomplete value (set it to '' on blur)
    case useCombobox.stateChangeTypes.InputBlur: // eslint-disable-line no-fallthrough
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

export const SelectStyle = (): ComponentStyleType =>
  css(`
    display: flex;
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
  ClearButton,
}

const defaultClassNames = {
  Select: SelectStyle(),
  Label: LabelStyle(),
  Combobox: ComboboxStyle(),
  TextInput: TextInputStyle(),
  ToggleMenuButton: ToggleMenuButtonStyle(),
  Menu: MenuStyle(),
  MenuOption: MenuOptionStyle(),
  InfoBox: InfoBoxStyle(),
  ClearButton: ClearButtonStyle(),
}

export const Select: SelectType = ({
  label,
  info,
  options,
  valueToString = defaultValueToString,

  value,
  onSetValue,

  onSearchTextChange,
  textInputProps = {},

  components = {},
  classNames = {},
}) => {
  const _components = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components]
  ) as SelectComponents

  const _classNames = useMemo(
    () => ({
      ...defaultClassNames,
      ...classNames,
    }),
    [classNames]
  ) as SelectComponentStyles

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

    // Actions
    closeMenu,
    openMenu,
    selectItem: selectOption,
    setHighlightedIndex,
    setInputValue,
    toggleMenu,
    reset,
  } = useCombobox({
    stateReducer,

    items: options,
    itemToString: valueToString,

    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) =>
      onSetValue(selectedItem === undefined ? null : selectedItem),

    onInputValueChange: ({ inputValue }) =>
      onSearchTextChange(inputValue ? inputValue : ''),
  })

  const selectContext: SelectContext = {
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
    actions: {
      closeMenu,
      openMenu,
      selectOption,
      setHighlightedIndex,
      setInputValue,
      toggleMenu,
      reset,
    },
  }

  return (
    <div className={applyIfFunction(_classNames.Select, selectContext)}>
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
            ...textInputProps,
            onFocus: () => {
              if (!isOpen) {
                openMenu()
              }
            },
          })}
        />

        {(value !== null || searchText !== '') && !isOpen ? (
          <_components.ClearButton {...selectContext} />
        ) : null}

        <_components.ToggleMenuButton
          {...selectContext}
          className={applyIfFunction(
            _classNames.ToggleMenuButton,
            selectContext
          )}
          buttonProps={getToggleButtonProps()}
        >
          &#9662;
        </_components.ToggleMenuButton>
      </_components.Combobox>
      <_components.Menu
        className={applyIfFunction(_classNames.Menu, selectContext)}
        menuProps={getMenuProps()}
        getOptionDomProps={({ option, index }) =>
          getItemProps({
            item: option,
            index,
          })
        }
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
          {...selectContext}
          className={applyIfFunction(_classNames.InfoBox, selectContext)}
        >
          {info}
        </_components.InfoBox>
      )}
    </div>
  )
}
