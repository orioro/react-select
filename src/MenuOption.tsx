import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING, DEFAULT_HIGHLIGHT_COLOR } from './constants'

import { MenuOptionType, MenuOptionStyleType, PlainObject } from './types'

const DEFAULT_HIGHLIGHT_STYLE = {
  backgroundColor: DEFAULT_HIGHLIGHT_COLOR,
}

export type MenuOptionStyleProps = {
  padding?: string | number
  highlightStyle?: string | PlainObject
}

export const MenuOptionStyle =
  ({
    padding = DEFAULT_PADDING,
    highlightStyle = DEFAULT_HIGHLIGHT_STYLE,
  }: MenuOptionStyleProps = {}): MenuOptionStyleType =>
  ({ isHighlighted }) =>
    css([
      `
        padding: ${padding};
        cursor: pointer;
      `,
      isHighlighted ? highlightStyle : {},
    ])

export const MenuOption: MenuOptionType = ({
  option,
  className,
}) => <div className={className}>{option.label}</div>
