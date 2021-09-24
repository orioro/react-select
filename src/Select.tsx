import React, { useMemo } from 'react'
import { css, cx } from '@emotion/css'
import { useCombobox } from 'downshift'

import { Label } from './Label'
import { Combobox } from './Combobox'
import { TextInput } from './TextInput'
import { ToggleMenuButton } from './ToggleMenuButton'
import { Menu } from './Menu'
import { MenuOption } from './MenuOption'

import { defaultValueToString, componentStyle } from './util'

import { SelectProps, SelectComponents } from './types'

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

const defaultComponents: SelectComponents = {
  Label,
  Combobox,
  TextInput,
  ToggleMenuButton,
  Menu,
  MenuOption,
}

export const Select = ({
  className,
  label,
  options,
  valueToString = defaultValueToString,

  value,
  onSetValue,

  searchText,
  onSetSearchText,

  components = {},
  styles = {},
}: SelectProps): React.ReactElement => {
  const _components: SelectComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components]
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

    // Functions
    openMenu,
  } = useCombobox({
    stateReducer,

    items: options,
    itemToString: valueToString,

    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => onSetValue(selectedItem),

    inputValue: searchText,
    onInputValueChange: ({ inputValue }) =>
      onSetSearchText(inputValue ? inputValue : ''),
  })

  const selectContext = {
    valueToString,
    state: {
      isOpen,
      highlightedIndex,
      searchText,
      value,
      options,
    },
  }

  return (
    <div
      className={cx(
        css([
          `
            display: inline-flex;
            flex-direction: column;
            position: relative;
          `,
          componentStyle(selectContext, styles.Select),
        ]),
        className
      )}
    >
      <_components.Label
        {...selectContext}
        labelProps={getLabelProps()}
        label={label}
        style={componentStyle(selectContext, styles.Label)}
      />
      <_components.Combobox
        {...selectContext}
        comboboxProps={getComboboxProps()}
        style={componentStyle(selectContext, styles.Combobox)}
      >
        <_components.TextInput
          {...selectContext}
          inputProps={getInputProps({
            onFocus: () => {
              if (!isOpen) {
                openMenu()
              }
            },
          })}
          style={componentStyle(selectContext, styles.TextInput)}
        />

        <_components.ToggleMenuButton
          {...selectContext}
          buttonProps={getToggleButtonProps()}
          style={componentStyle(selectContext, styles.ToggleMenuButton)}
        >
          &#9662;
        </_components.ToggleMenuButton>
      </_components.Combobox>
      <_components.Menu
        menuProps={getMenuProps()}
        getOptionDomProps={getItemProps}
        renderOption={({ option, index }) => (
          <_components.MenuOption
            {...{
              ...selectContext,
              option,
              index,
              isHighlighted: highlightedIndex === index,
              style: componentStyle({
                ...selectContext,
                isHighlighted: highlightedIndex === index,
                option,
                index
              }, styles.MenuOption),
            }}
          />
        )}
        style={componentStyle(selectContext, styles.Menu)}
        {...selectContext}
      />
    </div>
  )
}
