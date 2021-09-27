import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING } from './constants'

import { TextInputProps, ComponentStyleSpec } from './types'

export type TextInputStyleProps = {
  padding?: string | number
}

const _commonInputStyles = ({ padding }: TextInputStyleProps) =>
  `
  padding: ${padding};
  font-size: inherit;
  font-family: inherit;

  display: flex;
  align-items: center;
  border: 1px solid black;
`

export const TextInputStyle =
  ({
    padding = DEFAULT_PADDING,
  }: TextInputStyleProps = {}): ComponentStyleSpec =>
  () =>
    css(`
    position: relative;

    > input {
      ${_commonInputStyles({ padding })}
    }

    > div {
      ${_commonInputStyles({ padding })}

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      pointer-events: none;
    }
  `)

export const TextInput = ({
  className,
  inputProps,
  state,
  valueToString,
}: TextInputProps): React.ReactElement => (
  <div className={className}>
    <input {...inputProps} />

    {!state.isOpen && state.value && <div>{valueToString(state.value)}</div>}
  </div>
)
