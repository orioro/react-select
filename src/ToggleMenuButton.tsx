import React from 'react'

import { ToggleMenuButtonType, SelectComponentStyleType } from './types'

export const ToggleMenuButtonStyle = (): SelectComponentStyleType => null

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
