import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING } from './constants'

import { SelectedValueType, SelectedValueStyleType } from './types'

export const SelectedValueStyle = ({
  padding = DEFAULT_PADDING,
}: {
  padding?: string
} = {}): SelectedValueStyleType => css`
  display: flex;
  justify-content: space-between;
  padding: ${padding};

  > div {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > button {
    flex-shrink: 0;
  }
`

export const SelectedValue: SelectedValueType = ({
  className,
  value,
  valueToString,
  onRemove,
}) => (
  <div className={className}>
    <div>{valueToString(value)}</div>
    <button
      onClick={(e) => {
        e.stopPropagation()
        onRemove(value)
      }}
    >
      ×
    </button>
  </div>
)
