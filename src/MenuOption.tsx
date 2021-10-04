import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING, DEFAULT_HIGHLIGHT_COLOR } from './constants'

import { MenuOptionType, MenuOptionStyleType, PlainObject } from './types'

const DEFAULT_HIGHLIGHT_STYLE = {
  backgroundColor: DEFAULT_HIGHLIGHT_COLOR,
}

const DEFAULT_DISABLED_STYLE = {
  opacity: 0.3,
  cursor: 'default',
}

export type MenuOptionStyleProps = {
  padding?: string | number
  highlightStyle?: string | PlainObject
  disabledStyle?: string | PlainObject
}

export const MenuOptionStyle =
  ({
    padding = DEFAULT_PADDING,
    highlightStyle = DEFAULT_HIGHLIGHT_STYLE,
    disabledStyle = DEFAULT_DISABLED_STYLE,
  }: MenuOptionStyleProps = {}): MenuOptionStyleType =>
  ({ isHighlighted, option }) =>
    css([
      `
        padding: ${padding};
        cursor: pointer;
      `,
      isHighlighted ? highlightStyle : {},
      option.disabled ? disabledStyle : {},
    ])

export const MenuOption: MenuOptionType = ({ option, className }) => (
  <div className={className}>{option.label}</div>
)
