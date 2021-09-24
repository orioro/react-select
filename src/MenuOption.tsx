import React from 'react'
import { css, cx } from '@emotion/css'

import { MenuOptionProps } from './types'

export const MenuOption = ({
  option,
  valueToString,
  isHighlighted,
  style,
}: MenuOptionProps): React.ReactElement => (
  <div
    className={cx(
      css([
        `
          padding: 4px 6px;
          cursor: pointer;
          background-color: ${isHighlighted ? 'cyan' : 'transparent'}
        `,
        style,
      ])
    )}
  >
    {valueToString(option)}
  </div>
)
