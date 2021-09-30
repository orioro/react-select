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

import { applyIfFunction } from './util'

import {
  SelectProps,
  SelectType,
  SelectComponents,
  SelectComponentStyles,
  ComponentStyleType,
  SelectContext,
  Option,
  NotUndefined,
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

function _optionToString<ValueType = NotUndefined>(
  option: Option<ValueType> | null
) {
  return option === null ? '' : option.label
}

export function Select<ValueType = NotUndefined>({
  label,
  placeholder = '',
  info,
  options,

  value,
  onSetValue,

  onSearchTextChange,
  textInputProps = {},

  components = {},
  classNames = {},
}: SelectProps) {
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
    selectedItem: selectedOption,
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
  } = useCombobox<Option<ValueType>>({
    stateReducer,

    items: options,
    itemToString: _optionToString,

    selectedItem: useMemo(
      () => options.find((option) => option.value === value) || null,
      [options, value]
    ),
    onSelectedItemChange: ({ selectedItem }) =>
      onSetValue(
        selectedItem === undefined || selectedItem === null
          ? null
          : selectedItem.value
      ),

    onInputValueChange: ({ inputValue, type }) => {
      onSearchTextChange(inputValue ? inputValue : '')
    }
  })

  const selectContext: SelectContext = {
    state: useMemo(
      () => ({
        isOpen,
        highlightedIndex,
        searchText,
        selectedOption,
        value,
        options,
      }),
      [isOpen, highlightedIndex, searchText, value, options, selectedOption]
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
            placeholder: value ? '' : placeholder,
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
