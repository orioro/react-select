import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_PADDING } from './constants'

import {
  MenuOptionProps,
  MenuOptionStyleContext,
  ComponentStyleSpec,
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
  }: MenuOptionStyleProps = {}): ComponentStyleSpec<MenuOptionStyleContext> =>
  ({ isHighlighted }) =>
    css([
      `
        padding: ${padding};
        cursor: pointer;
      `,
      isHighlighted ? highlightStyle : {},
    ])

export const MenuOption = ({
  option,
  valueToString,
  className,
}: MenuOptionProps): React.ReactElement => (
  <div className={className}>{valueToString(option)}</div>
)
