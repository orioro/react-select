import React from 'react'
import { css, cx } from '@emotion/css'

import { TextInputProps, SelectState } from './types'

const commonInputStyles = `
  padding: 4px 6px;
  font-size: inherit;
  font-family: inherit;

  display: flex;
  align-items: center;
  border: 1px solid black;
`

const baseStyle = `
  position: relative;

  > input {
    ${commonInputStyles}
  }

  > div {
    ${commonInputStyles}

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;
  }
`

export const TextInput = ({
  inputProps,
  state,
  valueToString,
  style,
}: TextInputProps): React.ReactElement => (
  <div className={cx(css([baseStyle, style]))}>
    <input {...inputProps} />

    {!state.isOpen && state.value && <div>{valueToString(state.value)}</div>}
  </div>
)
