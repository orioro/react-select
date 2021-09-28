import React, { useMemo } from 'react'
import { Select } from './Select'
import {
  MultiSelectType,
  MultiSelectComponents,
  MultiSelectComponentStyleType,
  MultiSelectComponentStyles,
} from './types'
import { useMultipleSelection } from 'downshift'

import { defaultValueToString, applyIfFunction } from './util'
import { SelectedValueList, SelectedValueListStyle } from './SelectedValueList'
import { SelectedValue, SelectedValueStyle } from './SelectedValue'
import { css } from '@emotion/css'

export const MultiSelectStyles = (): MultiSelectComponentStyleType => css`
  display: inline-flex;
  flex-direction: column;
`

const defaultComponents = {
  SelectedValueList,
  SelectedValue,
}

const defaultClassNames = {
  MultiSelect: MultiSelectStyles(),
  SelectedValueList: SelectedValueListStyle(),
  SelectedValue: SelectedValueStyle(),
}

export const MultiSelect: MultiSelectType = ({
  value: selectedItems,
  onSetValue: onSetSelectedItems,
  options,
  components,
  classNames,
  ...selectProps
}) => {
  const { valueToString = defaultValueToString } = selectProps

  const _components = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components]
  ) as MultiSelectComponents

  const _classNames = useMemo(
    () => ({
      ...defaultClassNames,
      ...classNames,
    }),
    [classNames]
  ) as MultiSelectComponentStyles

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection({
    selectedItems,
    onSelectedItemsChange: ({ selectedItems }) =>
      onSetSelectedItems(selectedItems ? selectedItems : []),
  })

  const multiSelectContext = {
    state: {
      value: selectedItems,
    },
    valueToString,
  }

  return (
    <div
      className={applyIfFunction(_classNames.MultiSelect, multiSelectContext)}
    >
      <Select
        {...selectProps}
        options={options.filter(
          (option) => selectedItems.indexOf(option) === -1
        )}
        value={null}
        onSetValue={(selectedItem) => {
          if (selectedItem !== null) {
            addSelectedItem(selectedItem)
          }
        }}
        textInputProps={getDropdownProps()}
      />

      <_components.SelectedValueList
        {...multiSelectContext}
        className={applyIfFunction(
          _classNames.SelectedValueList,
          multiSelectContext
        )}
        getValueDomProps={({ value, index }) =>
          getSelectedItemProps({
            selectedItem: value,
            index,
          })
        }
        renderValue={({ value, index }) => (
          <_components.SelectedValue
            {...multiSelectContext}
            className={applyIfFunction(
              _classNames.SelectedValue,
              multiSelectContext
            )}
            value={value}
            index={index}
            onRemove={() => removeSelectedItem(value)}
          />
        )}
      />
    </div>
  )
}
