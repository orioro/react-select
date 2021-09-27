import React from 'react'

import { ToggleMenuButtonProps, ComponentStyleSpec } from './types'

export const ToggleMenuButtonStyle = (): ComponentStyleSpec => null

export const ToggleMenuButton = ({
  className,
  buttonProps,
  children,
}: ToggleMenuButtonProps): React.ReactElement => (
  <button
    className={className}
    type='button'
    aria-label='toggle menu'
    {...buttonProps}
  >
    {children}
  </button>
)
