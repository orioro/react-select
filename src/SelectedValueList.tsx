import { css } from '@emotion/css'
import React from 'react'

import { SelectedValueListType } from './types'

export const SelectedValueListStyle = () => (context) =>
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
