import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING } from './constants'

import {
  MenuOptionType,
  MenuOptionStyleType,
  PlainObject,
} from './types'

const DEFAULT_HIGHLIGHT_STYLE = {
  backgroundColor: '#bde4ff'
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
  valueToString,
  className,
}) => (
  <div className={className}>{valueToString(option)}</div>
)
