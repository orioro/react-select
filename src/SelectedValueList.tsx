import { css } from '@emotion/css'
import React from 'react'

import { SelectedValueListType, MultiSelectComponentStyleType } from './types'

export const SelectedValueListStyle =
  (): MultiSelectComponentStyleType => (context) =>
    css({
      display: context.state.value.length > 0 ? 'block' : 'none',
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      width: '100%',
      maxHeight: '200px',
      overflow: 'auto',
      border: '1px solid currentColor',
      borderTop: 'none',
    })

export const SelectedValueList: SelectedValueListType = ({
  state: { value: selectedValues },
  className,
  getValueDomProps,
  renderValue,
}) => (
  <ul className={className}>
    {selectedValues.map((value, index) => (
      <li
        key={`selected-value-${index}`}
        {...getValueDomProps({
          value,
          index,
        })}
      >
        {renderValue({ value, index })}
      </li>
    ))}
  </ul>
)
