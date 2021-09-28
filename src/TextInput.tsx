import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING } from './constants'

import { TextInputType, SelectComponentStyleType } from './types'

export type TextInputStyleProps = {
  padding?: string | number
}

const _commonInputStyles = ({ padding }: TextInputStyleProps) =>
  `
  padding: ${padding};
  font-size: inherit;
  font-family: inherit;

  display: flex;
  flex-grow: 1;
  align-items: center;
  border: none;
`

export const TextInputStyle =
  ({
    padding = DEFAULT_PADDING,
  }: TextInputStyleProps = {}): SelectComponentStyleType =>
  () =>
    css(`
    flex-grow: 1;
    display: flex;
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

export const TextInput: TextInputType = ({
  className,
  inputProps,
  state,
  valueToString,
}) => (
  <div className={className}>
    <input {...inputProps} />
    {!state.isOpen && state.value && <div>{valueToString(state.value)}</div>}
  </div>
)
