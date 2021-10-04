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
  SelectComponents,
  SelectComponentStyles,
  ComponentStyleType,
  SelectContext,
  Option,
} from './types'

type AnyObject = {
  [key: string]: any
}

const stateReducer = (
  state: AnyObject,
  { changes, type }: { changes: AnyObject; type: string }
) => {
  switch (type) {
    // Prevent searchText/inputValue from changing whenever selected item changes
    case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem: // eslint-disable-line no-fallthrough
      return {
        ...changes,
        inputValue: state.inputValue,
      }

    // Reset inputValue whenever user selects item
    // either through enter keydown or mouse click
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:

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

function _optionToString<ValueType = any>(option: Option<ValueType> | null) {
  return option === null ? '' : option.label
}

export function Select<ValueType = any>({
  label,
  placeholder = '',
  info,
  options,

  selectedOption,
  onSelectOption,

  onSearchTextChange,
  textInputProps = {},

  components = {},
  classNames = {},
}: SelectProps): React.ReactElement {
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
  } = useCombobox<Option<ValueType>>({
    stateReducer,

    items: options,
    itemToString: _optionToString,

    selectedItem: useMemo(() => {
      return selectedOption === null
        ? null
        : options.find((option) => option.value === selectedOption.value) ||
            selectedOption
    }, [selectedOption, options]),
    onSelectedItemChange: ({ selectedItem }) =>
      onSelectOption(
        selectedItem === undefined || selectedItem === null
          ? null
          : selectedItem
      ),

    initialInputValue: '',
    onInputValueChange: ({ inputValue }) => {
      onSearchTextChange(inputValue ? inputValue : '')
    },
  })

  const selectContext: SelectContext = {
    state: useMemo(
      () => ({
        isOpen,
        highlightedIndex,
        searchText,
        selectedOption,
        options,
      }),
      [isOpen, highlightedIndex, searchText, options, selectedOption]
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
            placeholder: selectedOption ? '' : placeholder,
            onFocus: () => {
              if (!isOpen) {
                openMenu()
              }
            },
          })}
        />

        {(selectedOption !== null || searchText !== '') && !isOpen ? (
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
            disabled: option.disabled,
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
