import React from 'react'
import { css } from '@emotion/css'
import { DEFAULT_HIGHLIGHT_COLOR } from './constants'

import { ToggleMenuButtonType, SelectComponentStyleType } from './types'

export const ToggleMenuButtonStyle =
  ({
    highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  }: {
    highlightColor?: string
  } = {}): SelectComponentStyleType =>
  ({ state: { isOpen } }) =>
    css({
      alignSelf: 'stretch',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: isOpen ? highlightColor : 'transparent',

      '&:hover': {
        backgroundColor: highlightColor,
      },
    })

export const ToggleMenuButton: ToggleMenuButtonType = ({
  className,
  buttonProps,
  children,
}): React.ReactElement => (
  <button
    className={className}
    type='button'
    aria-label='toggle menu'
    {...buttonProps}
  >
    {children}
  </button>
)
